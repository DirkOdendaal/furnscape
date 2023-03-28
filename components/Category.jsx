import React from "react";
import { IoMdArrowDropright } from "react-icons/io";


const Category = ({ category }) => {
  return (
    <li>
      <div className="cat">
        {category.name}
        <IoMdArrowDropright />
      </div>
      {category.subCategories && (
        <ul className="hero-card">
          {category.subCategories.map((subCat, index) => (
            <li key={`${index}-${subCat}`}>{subCat}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Category;
