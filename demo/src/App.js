import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

import "./llstbox/dist/react-listbox-select.css";
import { ListboxSelect, ListboxSelectMultiple } from "./llstbox/dist/index.esm";

function App() {
  const [selected, setSelected] = useState({ label: "Mango", value: "mango" });

  const [selectedMultiple, setSelectedMultiple] = useState([
    {
      label: "Margeting",
      value: "marketing",
    },
  ]);

  const multiSelectData = [
    {
      label: "Marketing",
      value: "marketing",
    },
    {
      label: "Engineering",
      value: "engineering",
    },
    {
      label: "Design",
      value: "design",
    },
    {
      label: "IT",
      value: "it",
    },
    {
      label: "Management",
      value: "management",
    },
    {
      label: "Development",
      value: "development",
    },
    {
      label: "HR",
      value: "hr",
    },
  ];
  const options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry", value: "strawberry" },
  ];

  const selectChange = (list) => {
    setSelected(list);
  };

  const selectChangeMultiple = (list) => {
    // console.log(list);
    setSelectedMultiple(list);
  };
  return (
    <div className="App">
      <div className="container">
        <>test 02</>
        <div className="wrap">
          <>
            <ListboxSelect
              title="Single Listbox Select"
              list={options}
              onChange={selectChange}
              value={selected}
              className="hello"
              prefixId="SingleSelect"
              collapsible={true}
            />
            <pre>{JSON.stringify(selected)}</pre>
          </>
        </div>
        <div className="wrap">
          <>
            <ListboxSelectMultiple
              title="Multi Listbox Select"
              list={multiSelectData}
              onChange={selectChangeMultiple}
              values={selectedMultiple}
              className="cool"
              prefixId="MultiSelectCategories_01"
              scrollable={true}
              collapsible={true}
            />
            <pre>{JSON.stringify(selectedMultiple)}</pre>
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
