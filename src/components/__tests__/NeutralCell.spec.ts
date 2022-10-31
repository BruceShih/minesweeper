import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NeutralCell from "../NeutralCell.vue";

describe("NeutralCell", () => {
  it("renders properly", () => {
    const wrapper = mount(NeutralCell, {
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

  it("reveals properly", async () => {
    const wrapper = mount(NeutralCell, {
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
    // expect(classes).toContain("bg-neutral");
  });
});
