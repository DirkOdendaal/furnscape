import React, { useEffect, useState } from "react";
import { Product } from "../components";
import { useRouter } from "next/router";
import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const QueriedProducts = () => {
  const [queriedProducts, setQueriedProducts] = useState();
  const router = useRouter();
  const { order, field, item, filter } = router.query;

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

export default QueriedProducts;
