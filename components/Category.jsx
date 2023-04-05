import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";

const Category = ({ category }) => {
  const fieldToFilter = "catagory.subCat";

  return (
    <li>
      <div className="cat">
        {category.name}
        <IoMdArrowDropright />
      </div>
      {category.subCategories && (
        <ul className="hero-card">
          {category.subCategories.map((subCat, index) => {
            return (
              <Link
                key={`${index}`}
                href={{
                  pathname: "/QueriedProducts",
                  query: {
                    order: "desc",
                    field: "sold",
                    item: fieldToFilter,
                    filter: subCat,
                  },
                }}
                as={{
                  pathname: "/QueriedProducts",
                  query: {
                    order: "desc",
                    field: "sold",
                    item: fieldToFilter,
                    filter: subCat,
                  },
                }}
              >
                <li>{subCat}</li>
              </Link>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default Category;
