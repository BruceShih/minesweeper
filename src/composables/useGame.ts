import { reactive } from "vue";

export function useGame() {
  return reactive(new Game());
}

type CellType = "Neutral" | "Primed" | "Indicator";

interface BaseCell {
  type: CellType;
  revealed: boolean;
  flagged: boolean;
}

export interface NeutralCell extends BaseCell {}

export interface PrimedCell extends BaseCell {}

export interface IndicatorCell extends BaseCell {
  indicator: number;
}

export type Cell = NeutralCell | PrimedCell | IndicatorCell;

export type State = "INITIAL" | "READY" | "STARTED" | "OVER";

export class Game {
  private _width: number = 9;
  private _height: number = 9;
  private _mines: number = 10;
  private _cells: Cell[][] = [];
  private _adjacentCells = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  private _state: State;
  private _win: boolean;

  constructor() {
    this._state = "INITIAL";
    this._win = false;
  }

  generate() {
    // clear old board
    this._cells = [];

    // generate mines
    let i = 0;
    const array = [];
    while (i < this._mines) {
      const r = Math.floor(Math.random() * this._width * this._height);
      if (array.indexOf(r) === -1) {
        array.push(r);
        i++;
      }
    }
    const sorted = array.sort((a, b) => a - b);

    // generate cells
    let k = 0;
    const tempCells: Cell[] = [];
    for (let j = 0; j < this._width * this._height; j++) {
      if (j === sorted[k]) {
        tempCells.push({ type: "Primed", revealed: false, flagged: false });
        k++;
      } else {
        tempCells.push({ type: "Neutral", revealed: false, flagged: false });
      }
    }
    // transpose tempCells to _cells, one row has this._width items
    for (let l = 0; l < this._height; l++) {
      this._cells.push(tempCells.slice(l * this._width, (l + 1) * this._width));
    }

    // mark indicators
    for (let m = 0; m < this._height; m++) {
      for (let n = 0; n < this._width; n++) {
        if (this._cells[m][n].type === "Neutral") {
          let count = 0;
          for (let o = 0; o < this._adjacentCells.length; o++) {
            const [x, y] = this._adjacentCells[o];
            if (
              m + x >= 0 &&
              m + x < this._height &&
              n + y >= 0 &&
              n + y < this._width &&
              this._cells[m + x][n + y].type === "Primed"
            ) {
              count++;
            }
          }
          if (count > 0) {
            this._cells[m][n] = {
              type: "Indicator",
              indicator: count,
              revealed: false,
              flagged: false,
            };
          }
        }
      }
    }

    this._state = "READY";
  }

  revealCell(x: number, y: number): void {
    this.reveal(x, y);

    if (this._state === "READY") {
      this._state = "STARTED";
    }

    this.checkGameState();
  }

  flagCell(x: number, y: number) {
    this.flag(x, y);

    if (this._state === "READY") {
      this._state = "STARTED";
    }
  }

  get cells() {
    return this._cells;
  }

  get state() {
    return this._state;
  }

  get win() {
    return this._win;
  }

  set width(value: number) {
    this._width = value;
  }

  set height(value: number) {
    this._height = value;
  }

  set mines(value: number) {
    this._mines = value;
  }

  private reveal(x: number, y: number) {
    if (this._cells[x][y].type === "Indicator") {
      this._cells[x][y].revealed = true;
      return;
    }

    if (
      this._cells[x][y].revealed === false &&
      this._cells[x][y].flagged === false
    ) {
      this._cells[x][y].revealed = true;
    }

    // reveal adjacent neutral cells
    if (this._cells[x][y].type === "Neutral") {
      for (let i = 0; i < this._adjacentCells.length; i++) {
        const [a, b] = this._adjacentCells[i];
        if (
          x + a >= 0 &&
          x + a < this._height &&
          y + b >= 0 &&
          y + b < this._width &&
          this._cells[x + a][y + b].revealed === false
        ) {
          if (
            this._cells[x + a][y + b].type === "Neutral" ||
            this._cells[x + a][y + b].type === "Indicator"
          ) {
            this.reveal(x + a, y + b);
          }
        }
      }
    }
  }

  private revealAll() {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        this._cells[i][j].revealed = true;
      }
    }
  }

  private revealAllButMines() {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        if (this._cells[i][j].type !== "Primed") {
          this._cells[i][j].revealed = true;
        }
      }
    }
  }

  private flag(x: number, y: number) {
    if (this._cells[x][y].revealed === false) {
      this._cells[x][y].flagged = !this._cells[x][y].flagged;
    }
  }

  private flagAllMines() {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        if (this._cells[i][j].type === "Primed") {
          this._cells[i][j].flagged = true;
        }
      }
    }
  }

  private checkGameState() {
    // check win state
    let count = 0;
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        if (this._cells[i][j].type !== "Primed" && this._cells[i][j].revealed) {
          count++;
        }
      }
    }
    if (count === this._width * this._height - this._mines) {
      this._state = "OVER";
      this._win = true;
      this.flagAllMines();
      this.revealAllButMines();
      return;
    }

    // check lost state
    for (let k = 0; k < this._height; k++) {
      for (let l = 0; l < this._width; l++) {
        if (this._cells[k][l].type === "Primed" && this._cells[k][l].revealed) {
          this._state = "OVER";
          this._win = false;
          this.revealAll();
          return;
        }
      }
    }
  }
}
