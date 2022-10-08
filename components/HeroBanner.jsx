import React, { useState, useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const HeroBanner = () => {
  const [catagories, setCatagories] = useState(null);

  useEffect(() => {
    const catRef = collection(db, "catagories");
    const q = query(catRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCatagories(
        snapshot.docs.map((cat) => ({
          id: cat.id,
          ...cat.data(),
        }))
      );
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <div className="hero-banner-container">
      <div className="hero-details-card hero-card">
        <div>
          <div className="hero-details-card-header">
            <h3>Shop By Category</h3>
          </div>
          <div>
            <ul>
              {catagories?.map((cat) => (
                <li key={cat.id}>
                  <span>{cat.name}</span>
                  <IoMdArrowDropright />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel">
            <div className="image-one"></div>
            <div className="image-two"></div>
            <div className="image-three"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
