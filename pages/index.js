import React, { useEffect } from "react";
import { collection, query, limit, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { HeroBanner, BestSelling, ProductCarousel, Error } from "../components";
import { useStateContext } from "../context/StateContext";

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

const Home = ({ bestSelling, error }) => {
  const { setError } = useStateContext();

  useEffect(() => {
    if (error) setError(true);
  }, [error]);

  if (error) {
    const error = {
      errorTitle: "Error",
      p1: "This page does not exist.",
      p2: "Please ensure you have the correct URL.",
      p3: "Mayby try going to our home page?",
      p4: "Come Back Tomorrow!",
    };
    return <Error error={error} data-testid="error-component" />;
  }

  return (
    <>
      <HeroBanner data-testid="hero-banner" />
      {/* <BestSelling /> */}
      <ProductCarousel products={bestSelling} data-testid="product-carousel" />
      {/* Add additional product carousels here */}
    </>
  );
};

Home.getInitialProps = async () => {
  const bestSellingCollectionRef = collection(db, "products");
  try {
    const bestSelling = await getProducts(bestSellingCollectionRef, [
      limit(16),
      orderBy("sold", "desc"),
    ]);
    return { bestSelling };
  } catch (error) {
    return { error };
  }
};

export default Home;
