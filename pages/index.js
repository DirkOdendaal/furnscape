import React, { useState } from "react";
import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { HeroBanner, BestSelling, ProductCarousel } from "../components";

const getProducts = async (collectionRef, queryOptions) => {
  const q = query(collectionRef, ...queryOptions);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

const Home = ({ bestSelling }) => {
  console.log("Home");
  return (
    <>
      <HeroBanner />
      {/* <BestSelling /> */}
      <ProductCarousel products={bestSelling} />
      {/* Add additional product carousels here */}
    </>
  );
};

Home.getInitialProps = async () => {
  const bestSellingCollectionRef = collection(db, "products");
  const bestSelling = await getProducts(bestSellingCollectionRef, [
    limit(16),
    orderBy("sold", "desc"),
  ]);
  return { bestSelling };
};

export default Home;
