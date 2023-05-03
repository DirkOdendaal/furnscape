import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loading from "./Loading";

const FilterDrawer = ({ title, priceRange, setPriceRange }) => {
  const [isOpened, setIsOpened] = useState(true);

  const handleToggleClick = () => {
    setIsOpened(!isOpened);
  };

  if (!priceRange) {
    return <Loading />;
  }

  return (
    <div className="filter-drawer-container">
      <button
        className={`filter-drawer-header${isOpened ? "-opened" : ""}`}
        onClick={handleToggleClick}
      >
        {title} {isOpened ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </button>
      <Collapse isOpened={isOpened}>
        <Slider
          range
          allowCross={false}
          min={priceRange.min}
          max={priceRange.max}
          defaultValue={[priceRange.min, priceRange.max]}
        />
      </Collapse>
    </div>
  );
};

export default FilterDrawer;
