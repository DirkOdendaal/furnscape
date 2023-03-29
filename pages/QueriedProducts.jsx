import React, { useEffect } from "react";
import { Product } from "../components";
import { useStateContext } from "../context/StateContext";

const QueriedProducts = () => {
  const { queriedProducts } = useStateContext();

  return (
    <div className="product-grid">
      <div className="landing-header">
        <h2>Best Selling Products</h2>
      </div>
      <div className="products-container">
        {queriedProducts?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// QueriedProducts.defaultProps = {
//   collectionRef: collection(db, "products"),
//   queryOptions: [limit(16), orderBy("sold", "desc")],
// };

export default QueriedProducts;
