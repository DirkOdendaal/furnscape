import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Product, Loading, Error } from "./";

//you can reuse this component when querying spesific producs like chairs or couches. You can spesify the props when loading for other components
const BestSelling = ({ collectionRef, queryOptions }) => {
  const [bestSellingProducts, setBestSelling] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const q = query(collectionRef, ...queryOptions);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setBestSelling(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setIsLoading(false);
        setError(err);
      }
    );

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className="product-grid">
      <div className="landing-header">
        <h2>Best Selling Products</h2>
      </div>
      <div className="products-container">
        {bestSellingProducts?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

BestSelling.defaultProps = {
  collectionRef: collection(db, "products"),
  queryOptions: [limit(16), orderBy("sold", "desc")],
};

export default BestSelling;
