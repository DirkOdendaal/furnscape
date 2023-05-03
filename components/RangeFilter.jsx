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
      <div className="filter-drawer">
        <Collapse isOpened={isOpened}>
          <Slider
            range
            allowCross={false}
            min={priceRange[0]}
            max={priceRange[1]}
            defaultValue={[priceRange[0], priceRange[1]]}
            onChange={(value) => handelRangeChange(value)}
          />
          <div className="range-filter-labels">
            <p>
              R{filterPriceRange?.length ? filterPriceRange[0] : priceRange[0]}
            </p>
            <p>
              R{filterPriceRange?.length ? filterPriceRange[1] : priceRange[1]}
            </p>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default RangeFilter;
