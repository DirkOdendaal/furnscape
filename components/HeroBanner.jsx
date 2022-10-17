import React, { useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useStateContext } from "../context/StateContext";

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
      unsubscribe;
    };
  }, []);

  return (
    <div className="hero-banner-container">
      <div className="hero-details-card hero-card" id="hero-nav">
        <div>
          <div className="hero-details-card-header">
            <h3>Shop By Category</h3>
          </div>
          <div>
            <ul className="nav">
              {catagories?.map((cat) => (
                <li key={cat.id}>
                  <div className="cat">
                    {cat.name}
                    <IoMdArrowDropright />
                  </div>
                  {cat.subCategories && (
                    <ul className="hero-card">
                      {cat.subCategories.map((subCat, index) => (
                        <li key={`${index}-${subCat}`}>{subCat}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel">
            <div
              className="image-container"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1480936600919-bffa6b7ecf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")`,
              }}
            ></div>
            <div
              className="image-container"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1480936600919-bffa6b7ecf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")`,
              }}
            ></div>
            <div
              className="image-container"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1480936600919-bffa6b7ecf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
