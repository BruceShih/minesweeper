import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PrimedCell from "../PrimedCell.vue";

describe("PrimedCell", () => {
  it("renders properly", () => {
    const wrapper = mount(PrimedCell);
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

  it("tripped", async () => {
    const wrapper = mount(PrimedCell);
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    await cell.trigger("click");
    const classes = cell.classes();
    expect(classes).toContain("flex");
    expect(classes).toContain("justify-center");
    expect(classes).toContain("items-center");
    expect(classes).toContain("w-12");
    expect(classes).toContain("h-12");
    expect(classes).toContain("bg-error");
  });

  it("flagged", async () => {
    const wrapper = mount(PrimedCell);
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    await cell.trigger("click.right");
    const classes = cell.classes();
    expect(classes).toContain("flex");
    expect(classes).toContain("justify-center");
    expect(classes).toContain("items-center");
    expect(classes).toContain("w-12");
    expect(classes).toContain("h-12");
    expect(classes).toContain("bg-neutral");
  });
});
