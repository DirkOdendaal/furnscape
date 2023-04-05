import React, { useEffect, useState } from "react";
import { Product } from "../components";
import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const QueriedProducts = ({ urlParams }) => {
  const { order, field, item, filter } = urlParams;
  const [queriedProducts, setQueriedProducts] = useState();

  const collectionRef = collection(db, "products");
  const productQuery = [
    limit(16),
    orderBy(field, order),
    where(item, "==", filter),
  ];

  useEffect(() => {
    const q = query(collectionRef, ...productQuery);
    onSnapshot(q, (querySnapshot) => {
      setQueriedProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="product-grid">
      <div className="queried-header">
        <h2>{filter}</h2>
      </div>
      <div className="products-container">
        {queriedProducts?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

QueriedProducts.getInitialProps = async ({ query }) => {
  const urlParams = query;
  return { urlParams };
};

export default QueriedProducts;
