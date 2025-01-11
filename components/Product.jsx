import React from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";

const Product = ({ product: { images, name, id, price } }) => {
  return (
    <Link href={`/product/${id}`} style={{ textDecoration: "none", color: "black" }}>
      <div className="product-card">
        <Image
          src={images[0]}
          className="product-image"
          width={130}
          height={130}
          alt={""}
        ></Image>
        <span className="product-name">{name}</span>
        <span className="product-price">R{price}</span>
        {/* <span className="product-price"><AiFillStar color="yellow"/> 3.5 (20)</span> */}
      </div>
    </Link>
  );
};

export default Product;
