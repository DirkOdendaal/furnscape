import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loading from "./Loading";

const RangeFilter = ({
  title,
  priceRange,
  setfilterPriceRange,
  filterPriceRange,
}) => {
  const [isOpened, setIsOpened] = useState(true);

  const handleToggleClick = () => {
    setIsOpened(!isOpened);
  };

  const handelRangeChange = (value) => {
    setfilterPriceRange([value[0], value[1]]);
  };

  if (!priceRange & !filterPriceRange) {
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
        <div className="filter-drawer">
          <Slider
            range
            allowCross={false}
            min={priceRange[0]}
            max={priceRange[1]}
            defaultValue={[priceRange[0], priceRange[1]]}
            onChange={(value) => handelRangeChange(value)}
            trackStyle={{ backgroundColor: "#2cdd82" }}
            handleStyle={{
              borderColor: "#012e55",
              backgroundColor: "#012e55",
              
            }}
            railStyle={{ backgroundColor: "#012e55" }}
          />
          <div className="range-filter-labels">
            <p>
              R{filterPriceRange?.length ? filterPriceRange[0] : priceRange[0]}
            </p>
            <p>
              R{filterPriceRange?.length ? filterPriceRange[1] : priceRange[1]}
            </p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default RangeFilter;
