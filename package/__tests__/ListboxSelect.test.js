import React from "react";
import renderer from "react-test-renderer";

import { ListboxSelect } from "../index";

describe("ListboxSelect renders correctly", () => {
  test("snapshot renders", () => {
    const options = [
      { label: "Grapes", value: "grapes" },
      { label: "Mango", value: "mango" },
      { label: "Strawberry", value: "strawberry" },
    ];

    const component = renderer.create(
      <ListboxSelect
        title="Single Listbox Select"
        list={options}
        value={{ label: "Mango", value: "mango" }}
        className="my-class-name"
        prefixId="SingleSelect"
        collapsible={true}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
