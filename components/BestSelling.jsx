import { collection, query, limit, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Product } from "./";

const BestSelling = () => {
  const [bestSellingProducts, setBestSelling] = useState();

  useEffect(() => {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setBestSelling(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <div className="landing-header">
        <h2>Best Selling Products</h2>
      </div>
      <div className="products-container">
        {bestSellingProducts?.map((product) =>
          <Product key={product.id} product={product} />
        )}
      </div>
    </>
  );
};

export default BestSelling;
