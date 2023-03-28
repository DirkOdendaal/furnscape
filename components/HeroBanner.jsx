import React, { useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useStateContext } from "../context/StateContext";
import Category from "./Category";

const HeroBanner = () => {
  const { catagories, setCatagories } = useStateContext();
  useEffect(() => {
    const catRef = collection(db, "catagories");

    const catq = query(catRef);
    const unsubscribe = onSnapshot(catq, (snapshot) => {
      setCatagories(
        snapshot.docs.map((cat) => ({
          id: cat.id,
          ...cat.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, [catagories]);

  return (
    <div className="hero-banner-container">
      <div className="hero-details-card hero-card" id="hero-nav">
        <div className="hero-details-card-header">
          <h3>Shop By Category</h3>
        </div>
        <ul className="nav">
          {catagories?.map((cat) => (
            <Category key={cat.id} category={cat} />
          ))}
        </ul>
      </div>
      <ImageCarousel
        images={[
          "/furnscape/CarouselImage1.jpg",
          "/furnscape/CarouselImage2.jpg",
          "/furnscape/CarouselImage3.jpg",
          "/furnscape/CarouselImage4.jpg",
          "/furnscape/CarouselImage5.jpg",
          "/furnscape/CarouselImage6.jpg",
        ]}
      />
    </div>
  );
};

export default HeroBanner;
