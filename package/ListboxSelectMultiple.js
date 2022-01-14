import React from "react";
import PropTypes from "prop-types";
const ListboxSelectMultiple = (props) => {
  const { useState, useEffect } = React;

  const [selected, setSelected] = useState({});
  const [hasClicked, setHasClicked] = useState(false);
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

  const selectFilter = (selectId) => {
    setSelected({ ...selected, [selectId]: !selected[selectId] });
  };

  const expandList = () => {
    setVisible(!visible);
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
      // console.log(newObject);
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
              aria-multiselectable="true"
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
