import React from "react";
import PropTypes from "prop-types";
const ListboxSelect = (props) => {
  const { useState, useEffect } = React;
  const [selected, setSelected] = useState({});
  const [hasClicked, setHasClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const {
    className,
    list,
    title,
    onChange,
    value,
    prefixId,
    scrollable,
    collapsible,
  } = props;

  const selectFilter = (selectId) => {
    setSelected({ [selectId]: !selected[selectId] });
  };

  const expandList = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const getSelectedFilters = Object.keys(selected).filter((e) => selected[e]);

    let selectedItems = getSelectedFilters;
    let arr = list;

    let filteredObject = {};

    for (let i = 0; i < arr.length; i++) {
      if (selectedItems.indexOf(arr[i].value) > -1) filteredObject = arr[i];
    }

    /// callback selected
    if (hasClicked) {
      onChange(filteredObject);
    }
  }, [selected]);

  /// set the initial selected items

  useEffect(() => {
    if (value != undefined && Object.keys(value).length) {
      const newObject = {
        [value.value]: true,
      };

      setSelected(newObject);
    }
  }, []);

  return (
    <>
      <div className={`react-listbox-select ${className ? className : ""}`}>
        {collapsible ? (
          <div
            onClick={() => {
              expandList();
            }}
            id={"rlsm_elem_" + prefixId}
            className={`listbox-title clickable  ${visible ? "visible" : ""}`}
          >
            {title}
          </div>
        ) : (
          <div id={"rlsm_elem_" + prefixId} className="listbox-title">
            {title}
          </div>
        )}

        <div
          className={`listbox-container ${collapsible ? "collapsible" : ""} ${
            visible ? "visible" : ""
          }`}
        >
          <div>
            <ul
              id={"rlsm_elem_list_" + prefixId}
              role="listbox"
              aria-labelledby={"rlsm_elem_" + prefixId}
              className={`list ${scrollable ? "scrollable" : ""}`}
            >
              {list.map((filter) => {
                return (
                  <li
                    key={filter.value}
                    className={selected[filter.value] ? "selected" : ""}
                    role="option"
                    aria-selected={selected[filter.value] ? "true" : "false"}
                    aria-label={filter.label}
                    id={"rlsm_elem_" + prefixId + "_" + filter.value}
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
      </div>{" "}
    </>
  );
};

export default ListboxSelect;

ListboxSelect.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.object,
  prefixId: PropTypes.string,
  scrollable: PropTypes.bool,
  collapsible: PropTypes.bool,
};

ListboxSelect.defaultProps = {
  prefixId: "_single",
  scrollable: false,
  collapsible: false,
};
