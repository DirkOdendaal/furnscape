import React, { useState, useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useStateContext } from "../context/StateContext";


const Category = ({ category }) => {
  const { setQueriedProducts } = useStateContext();

  const handleSubCatClick = (subCat) => {
    const queryOptions = [
      limit(16),
      orderBy("sold", "desc"),
      where("catagory.subCat", "==", `${subCat}`),
    ];
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, ...queryOptions);

    onSnapshot(q, (querySnapshot) => {
      setQueriedProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  return (
    <li>
      <div className="cat">
        {category.name}
        <IoMdArrowDropright />
      </div>
      {category.subCategories && (
        <ul className="hero-card">
          {category.subCategories.map((subCat, index) => (
            <li
              key={`${index}-${subCat}`}
              onClick={() => handleSubCatClick(subCat)}
            >
              {subCat}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Category;
