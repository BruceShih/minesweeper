import { describe, it, expect, beforeEach } from "vitest";
import { Game } from "../useGame";

describe("composable useGame()", () => {
  const width = 16;
  const height = 16;
  const mines = 40;
  const adjacentCells = [
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
  let game: Game;

  beforeEach(() => {
    game = new Game();
    game.width = width;
    game.height = height;
    game.mines = mines;
    game.generate();
  });

  it("generates successfully", () => {
    expect(game.cells.length).not.toBe(0);
    expect(game.state).toBe("READY");
  });

  it("has valid board", () => {
    const flatten = game.cells.flat();
    let indicatorCellsCount = 0;
    const indicatorCells: number[][] = [];
    const neutralCellsCount = flatten.filter(
      (c) => c.type === "Neutral"
    ).length;
    const primedCellsCount = flatten.filter((c) => c.type === "Primed").length;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (game.cells[i][j].type === "Primed") {
          adjacentCells.forEach((adj) => {
            const [x, y] = adj;
            if (i + x >= 0 && i + x < height && j + y >= 0 && j + y < width) {
              if (game.cells[i + x][j + y].type === "Indicator") {
                const item = [i + x, j + y];
                const existed = indicatorCells.find(
                  (cell) => cell[0] === item[0] && cell[1] === item[1]
                );
                if (!existed) {
                  indicatorCells.push(item);
                }
              }
            }
          });
        }
      }
    }
    indicatorCellsCount = indicatorCells.length;

    expect(primedCellsCount).toBe(mines);
    expect(indicatorCellsCount + neutralCellsCount).toBe(
      width * height - mines
    );
  });

  it("has not started yet", () => {
    expect(game.state).toBe("READY");
    expect(game.win).toBe(false);
  });

  it("starts game", () => {
    game.revealCell(0, 0);
    if (game.cells[0][0].type === "Primed") {
      expect(game.state).toBe("OVER");
      expect(game.win).toBe(false);
    } else {
      expect(game.state).toBe("STARTED");
      expect(game.win).toBe(false);
    }
  });

  it("ends game due to mine tripped", () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (game.cells[i][j].type === "Primed") {
          game.revealCell(i, j);
          break;
        }
      }
    }

    expect(game.state).toBe("OVER");
    expect(game.win).toBe(false);
  });
});
