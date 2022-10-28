import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import IndicatorCell from "../IndicatorCell.vue";

describe("IndicatorCell", () => {
  it("renders properly", () => {
    const wrapper = mount(IndicatorCell);
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    const classes = cell.classes();
    expect(classes).toContain("flex");
    expect(classes).toContain("justify-center");
    expect(classes).toContain("items-center");
    expect(classes).toContain("w-12");
    expect(classes).toContain("h-12");
    expect(classes).toContain("bg-base-200");
  });

  it("reveals properly", async () => {
    const wrapper = mount(IndicatorCell, {
      props: {
        indicator: 5,
      },
    });
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    await cell.trigger("click");
    expect(cell.text()).toBe("5");
    const classes = cell.classes();
    expect(classes).toContain("flex");
    expect(classes).toContain("justify-center");
    expect(classes).toContain("items-center");
    expect(classes).toContain("w-12");
    expect(classes).toContain("h-12");
    expect(classes).toContain("bg-neutral");
  });
});
