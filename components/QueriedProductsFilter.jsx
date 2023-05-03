import React, { useState, useEffect } from "react";
import Select from "react-select";
import { RangeFilter } from "../components";

const QueriedProductsFilter = ({ queriedProducts, setFilterProducts }) => {
  const [prices, setPrices] = useState([]);
  const [priceRange, setPriceRange] = useState();
  const [filterPriceRange, setfilterPriceRange] = useState();

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
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [prices]);

  //Set new products to filtered products
  useEffect(() => {
    const filtered = queriedProducts?.filter(
      (product) =>
        product.price >= filterPriceRange[0] &&
        product.price <= filterPriceRange[1]
    );
    setFilterProducts(filtered);
  }, [filterPriceRange]);

  return (
    <div className="product-filter">
      <div className="product-filter-header">
        <h3>Filters</h3>
      </div>
      <RangeFilter
        title={"Price"}
        priceRange={priceRange}
        setfilterPriceRange={setfilterPriceRange}
        filterPriceRange={filterPriceRange}
      />
    </div>
  );
};

export default QueriedProductsFilter;
