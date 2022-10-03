import React from "react";
import { doc, query, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, reviews }) => {
  const { price, description, name, image } = product;
  const { decQuantity, incQuantity, qty, setQty, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div className="image-container">
          <img src={image} className="product-detail-image"></img>
          <div className="small-image-container">insert loop here</div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>
          <h4>Details: </h4>
          <p>{description}</p>
          <p className="price">R{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty);
                setQty(1);
              }}
            >
              Add To Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async ({}) => {
  //Reviews

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const documentRef = doc(db, `products`, slug);
  const docSnap = await getDoc(documentRef);
  const product = docSnap.data();

  return {
    props: { product },
  };
};

export default ProductDetails;
