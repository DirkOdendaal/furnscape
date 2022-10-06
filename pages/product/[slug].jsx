import React, { useState, useEffect } from "react";
import { doc, query, onSnapshot, getDoc, collection } from "firebase/firestore";
import { Reviews, ReviewPopup } from "../../components";
import { db } from "../../config/firebase";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ProductDetails = ({ product, slug }) => {
  const { user } = useAuth();
  const { price, description, name, image } = product;
  const [reviews, setReviews] = useState(null);
  const [reviewsAve, setReviewsAve] = useState(0);
  const {
    decQuantity,
    incQuantity,
    qty,
    setQty,
    onAdd,
    showReviewPopup,
    setReviewPopUp,
  } = useStateContext();

  useEffect(() => {
    //product reveiws
    const reviewRef = collection(db, `products/${slug}`, "reviews");
    const q = query(reviewRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    setReviewsAve(0);
    reviews?.map((review) => {
      setReviewsAve((prevAve) => prevAve + review.review / reviews.length);
    });
  }, [reviews]);

  return (
    <div className="product-details-wrapper">
      <div className="product-detail-container">
        <div className="image-container">
          <img src={image} className="product-detail-image"></img>
          <div className="small-image-container">insert loop here</div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>

          <h4>Description:</h4>
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
      <div className="product-review-container">
        <div className="reviews-container">
          <div className=""></div>
          <div>
            <h4>Reviews</h4>
          </div>
          <div className="reviews-header">
            <p>{reviews?.length}</p>
            <div className="review-stars">
              <p>{reviews ? reviewsAve : null}</p>
              {[...Array(5)].map((value, i) => (
                <AiFillStar
                  key={`review-total-${i}`}
                  color={i < reviewsAve ? "#fdcc0d" : "lightgray"}
                />
              ))}
            </div>
            <button
              className="btn"
              onClick={() => {
                if (user) {
                  setReviewPopUp(true);
                } else {
                  toast.error("Log in To Review This Item", {
                    style: { backgroundColor: "#012e55", color: "#2cdd82" },
                    duration: 6000,
                  });
                }
              }}
            >
              Write Review
            </button>
            {showReviewPopup && <ReviewPopup product={product} slug={slug} />}
          </div>
          <div className="reviews">
            {reviews?.map((review) => (
              <Reviews key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async ({}) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  //products
  const productRef = doc(db, `products`, slug);
  const prodSnap = await getDoc(productRef);
  const product = prodSnap.data();

  return {
    props: { product, slug },
  };
};

export default ProductDetails;
