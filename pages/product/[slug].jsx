import React, { useState, useEffect } from "react";
import { doc, query, onSnapshot, getDoc, collection } from "firebase/firestore";
import { Reviews, ReviewPopup } from "../../components";
import { db } from "../../config/firebase";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineClose,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductDetails = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
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

  const router = useRouter();
  const { slug } = router.query;

  const getProduct = async () => {
    const productRef = doc(db, `products`, slug);
    const prodSnap = await getDoc(productRef);
    setProduct(prodSnap.data());
  };

  useEffect(() => {
    const reviewRef = collection(db, `products/${slug}`, "reviews");
    const q = query(reviewRef);
    getProduct();
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
  }, [slug]);

  useEffect(() => {
    setReviewsAve(0);
    reviews?.map((review) => {
      setReviewsAve(
        (prevAve) =>
          Math.round((prevAve + review.review / reviews.length) * 10) / 10
      );
    });
  }, [reviews]);

  function handleFilterChange(event) {
    console.log(event.target.value);
  }

  if (!user && !reviews && !product) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="product-details-wrapper">
      <div className="product-detail-container">
        <div className="image-container">
          {product?.images && (
            <Image
              height={200}
              width={200}
              src={product.images[0]}
              alt={""}
              className="product-detail-image"
            ></Image>
          )}
          <div className="small-image-container">{
            // <Image
            //   key={`product-image-array-item-${i}`}
            //   height={80}
            //   width={80}
            //   src={product.images[i]}
            //   alt={""}
            //   className="product-detail-image"
            // ></Image>
          }
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product?.name}</h1>

          <h4>Description:</h4>
          <p>{product?.description}</p>
          <p className="price">R{product?.price}</p>
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
          <div className="reviews-header">
            <div className="review-stars">
              <h1>{reviews ? reviewsAve : null}</h1>
              <p>
                {[...Array(5)].map((value, i) => (
                  <AiFillStar
                    key={`review-total-${i}`}
                    color={i < reviewsAve ? "#fdcc0d" : "lightgray"}
                  />
                ))}
              </p>
              <p className="review-stars-count">{reviews?.length} Reviews</p>
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
          <div>
            <div
              className="filter-reviews"
              onChange={handleFilterChange}
              id="filter-reviews"
            >
              <div className="filter-header">
                <h4>Filter Reviews</h4>
                <AiOutlineClose className="filter-clear" />
              </div>
              <div className="filter-radio">
                <input type="radio" value="5" name="filterReview"></input>
                <p>5</p>
                <AiFillStar color={"#fdcc0d"} />
              </div>
              <div className="filter-radio">
                <input type="radio" value="4" name="filterReview"></input>
                <p>4</p>
                <AiFillStar color={"#fdcc0d"} />
              </div>
              <div className="filter-radio">
                <input type="radio" value="3" name="filterReview"></input>
                <p>3</p>
                <AiFillStar color={"#fdcc0d"} />
              </div>
              <div className="filter-radio">
                <input type="radio" value="2" name="filterReview"></input>
                <p>2</p>
                <AiFillStar color={"#fdcc0d"} />
              </div>
              <div className="filter-radio">
                <input type="radio" value="1" name="filterReview"></input>
                <p>1</p>
                <AiFillStar color={"#fdcc0d"} />
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-container">
          <div className="reviews">
            {reviews?.length > 1 ? (
              reviews?.map((review) => (
                <Reviews key={review.id} review={review} />
              ))
            ) : (
              <div>No Reviews. Be the first to review this product!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
