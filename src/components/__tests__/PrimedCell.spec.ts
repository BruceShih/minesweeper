import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PrimedCell from "../PrimedCell.vue";

describe("PrimedCell", () => {
  it("renders properly", () => {
    const wrapper = mount(PrimedCell, {
      props: {
        reveal: false,
        flag: false,
        "onUpdate:reveal": (e: boolean) => wrapper.setProps({ reveal: e }),
        "onUpdate:flag": (e: boolean) => wrapper.setProps({ flag: e }),
      },
    });
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    // const classes = cell.classes();
    // expect(classes).toContain("flex");
    // expect(classes).toContain("justify-center");
    // expect(classes).toContain("items-center");
    // expect(classes).toContain("w-8");
    // expect(classes).toContain("h-8");
    // expect(classes).toContain("bg-base-200");
  });

  it("tripped", async () => {
    const wrapper = mount(PrimedCell, {
      props: {
        reveal: false,
        flag: false,
        "onUpdate:reveal": (e: boolean) => wrapper.setProps({ reveal: e }),
        "onUpdate:flag": (e: boolean) => wrapper.setProps({ flag: e }),
      },
    });
    await wrapper.setProps({ reveal: true });
    expect(wrapper.props("reveal")).toBe(true);
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    // const classes = cell.classes();
    // expect(classes).toContain("flex");
    // expect(classes).toContain("justify-center");
    // expect(classes).toContain("items-center");
    // expect(classes).toContain("w-8");
    // expect(classes).toContain("h-8");
    // expect(classes).toContain("bg-error");
  });

  it("flagged", async () => {
    const wrapper = mount(PrimedCell, {
      props: {
        reveal: false,
        flag: false,
        "onUpdate:reveal": (e: boolean) => wrapper.setProps({ reveal: e }),
        "onUpdate:flag": (e: boolean) => wrapper.setProps({ flag: e }),
      },
    });
    await wrapper.setProps({ flag: true });
    expect(wrapper.props("flag")).toBe(true);
    const cell = wrapper.find("button");
    expect(cell.exists()).toBeTruthy();
    // const classes = cell.classes();
    // expect(classes).toContain("flex");
    // expect(classes).toContain("justify-center");
    // expect(classes).toContain("items-center");
    // expect(classes).toContain("w-8");
    // expect(classes).toContain("h-8");
    // expect(classes).toContain("bg-neutral");
  });
});
