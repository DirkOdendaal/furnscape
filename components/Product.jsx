import React from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";

const Product = ({ product: { image, name, id, price } }) => {
  return (
    <div>
      <Link href={`/product/${id}`}>
        <div className="product-card">
          <Image
            src={image}
            className="product-image"
            width={150}
            height={150}
            alt={""}
          ></Image>
          <p className="product-name">{name}</p>
          <p className="product-price">R{price}</p>
          {/* <p className="product-price"><AiFillStar/> 3.5 (20)</p> */}
        </div>
      </Link>
    </div>
  );
};

export default Product;
