import React from "react";
import PropTypes from "prop-types";
const ListboxSelectMultiple = (props) => {
  const { useState, useEffect } = React;

  const [selected, setSelected] = useState({});
  const [hasClicked, setHasClicked] = useState(false);

  const { className, list, title, onChange, values } = props;

  const selectFilter = (selectId) => {
    setSelected({ ...selected, [selectId]: !selected[selectId] });
  };

  useEffect(() => {
    const getSelectedFilters = Object.keys(selected).filter((e) => selected[e]);

    let filteredArray = [];
    let ids = getSelectedFilters;
    let arr = list;

    for (let i = 0; i < arr.length; i++) {
      if (ids.indexOf(arr[i].value) > -1) filteredArray.push(arr[i]);
    }

    /// callback selected
    if (hasClicked) {
      onChange(filteredArray);
    }
  }, [selected]);

  /// set the initial selected items

  useEffect(() => {
    if (values != undefined) {
      const newObject = values.reduce((acc, filter) => {
        acc[filter.value] = true;
        return acc;
      }, {});
      console.log(newObject);
      setSelected(newObject);
    }
  }, []);

  return (
    <>
      <div className={`react-listbox-select ${className ? className : ""}`}>
        <div className="headline-filter">{title}</div>
        <div className="filter-container">
          <div>
            <ul>
              {list.map((filter) => {
                return (
                  <li
                    key={filter.value}
                    className={selected[filter.value] ? "selected" : ""}
                  >
                    <button
                      onClick={() => {
                        selectFilter(filter.value);
                        setHasClicked(true);
                      }}
                      className="btn-filter"
                      aria-label={filter.label}
                    >
                      <div className="filter-item">
                        <span className="filter-label"> {filter.label}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            selected:
            <pre>{JSON.stringify(selected, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListboxSelectMultiple;

ListboxSelectMultiple.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  values: PropTypes.array.isRequired,
  className: PropTypes.string,
};