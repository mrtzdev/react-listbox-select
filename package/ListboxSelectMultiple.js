import React from "react";
import PropTypes from "prop-types";
const ListboxSelectMultiple = (props) => {
  const { useState, useEffect } = React;

  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);

  const {
    className,
    list,
    title,
    onChange,
    values,
    prefixId,
    scrollable,
    collapsible,
  } = props;

  const selectFilter = (selectedValue) => {
    const findItem = () => {
      let item = list.find((x) => x.value === selectedValue);
      return item;
    };

    /// Check if an Array contains  Object
    const index = selected.findIndex((element) => {
      if (element.value === findItem().value) {
        return true;
      }
    });
    /// object is in array: remove the item else add the item
    if (index !== -1) {
      const removeItem = selected.filter(
        (item) => item.value !== findItem().value
      );
      const newArray = removeItem;
      onChange(newArray);
    } else {
      const newArray = [...selected, findItem()];
      onChange(newArray);
    }
  };

  /// find the selected items
  const findSelected = (v) => {
    return selected.some(function (el) {
      return el.value === v;
    });
  };

  const expandList = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setSelected(values);
  }, [values]);

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
              aria-multiselectable="true"
              className={`list ${scrollable ? "scrollable" : ""}`}
            >
              {list.map((filter) => {
                return (
                  <li
                    key={filter.value}
                    id={"rlsm_elem_" + prefixId + "_" + filter.value}
                    className={`item ${
                      findSelected(filter.value) ? "selected" : ""
                    }`}
                    role="option"
                    aria-selected={
                      findSelected(filter.value) ? "true" : "false"
                    }
                    aria-label={filter.label}
                  >
                    <button
                      onClick={() => {
                        selectFilter(filter.value);
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
  prefixId: PropTypes.string,
  scrollable: PropTypes.bool,
  collapsible: PropTypes.bool,
};

ListboxSelectMultiple.defaultProps = {
  prefixId: "_multiple",
  scrollable: false,
  collapsible: false,
};
