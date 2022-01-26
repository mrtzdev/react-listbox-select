import React from "react";
import PropTypes from "prop-types";
const ListboxSelect = (props) => {
  const { useState, useEffect } = React;
  const [selected, setSelected] = useState({});
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

  const expandList = () => {
    setVisible(!visible);
  };

  const selectFilter = (selectValue) => {
    const findItem = () => {
      let item = list.find((x) => x.value === selectValue);
      return item;
    };

    onChange(findItem());
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

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
                    className={`item ${
                      filter.value === selected.value ? "selected" : ""
                    }`}
                    role="option"
                    aria-selected={
                      filter.value === selected.value ? "true" : "false"
                    }
                    aria-label={filter.label}
                    id={"rlsm_elem_" + prefixId + "_" + filter.value}
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
