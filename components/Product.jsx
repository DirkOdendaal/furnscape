import React from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

const Product = ({ product: { image, name, id, price } }) => {
  return (
    <div>
      <Link href={`/product/${id}`}>
        <div className="product-card">
          <img
            src={image}
            width={150}
            height={150}
            className="product-image"
          ></img>
          <p className="product-name">{name}</p>
          <p className="product-price">R{price}</p>
          {/* <p className="product-price"><AiFillStar/> 3.5 (20)</p> */}
        </div>
      </Link>
    </div>
  );
};

export default Product;
