import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FilterDrawer } from "../components";

const QueriedProductsFilter = ({ queriedProducts, setFilterProducts }) => {
  const [prices, setPrices] = useState([]);
  const [priceRange, setPriceRange] = useState();

  //set price list
  useEffect(() => {
    if (queriedProducts) {
      const productPrices = queriedProducts.map((product) => product.price);
      setPrices(productPrices);
    }
  }, [queriedProducts]);

  // Set initial Price Range
  useEffect(() => {
    if (prices.length) {
      setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
    }
  }, [prices]);

  useEffect(() => {
    if (priceRange) console.log(priceRange);
  }, [priceRange]);

  return (
    <div className="product-filter">
      <div className="product-filter-header">
        <h3>Filters</h3>
      </div>
      <FilterDrawer
        title={"Price"}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
    </div>
  );
};

export default QueriedProductsFilter;
