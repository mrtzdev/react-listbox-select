# react-listbox-select component

# Usage

Import the component you want to use;

```javascript
import { ListboxSelect, ListboxSelectMultiple } from "react-listbox-select";
import "react-listbox-select/dist/react-listbox-select.css";
```

**Single Select**

```tsx
import React, { useState } from "react";
import { ListboxSelect } from "react-listbox-select";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry" },
];

const Example = () => {
  const [selected, setSelected] = useState([]);

  const selectChange = (list) => {
    setSelected(list);
  };

  return (
    <div>
      <h1>Select Options</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <ListboxSelect
        title="Single Listbox Select"
        list={options}
        onChange={selectChange}
        value={selected}
        className="my-class-name"
        prefixId="SingleSelect"
      />
    </div>
  );
};

export default Example;
```
