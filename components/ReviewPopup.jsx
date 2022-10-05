import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import { AiFillStar } from "react-icons/ai";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";

const ReviewPopup = ({ product, slug }) => {
  const { user } = useAuth();
  const { setReviewPopUp } = useStateContext();
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");

  const publishReview = async () => {
    const documentToPush = {
      title,
      desc,
      name,
      review: rating,
      uuid: user.uid,
    };
    const revCollection = collection(db, `products/${slug}/reviews`);
    const reviewCheck = await getDoc(revCollection, documentToPush);
    console.log();
    // await addDoc(revCollection, documentToPush);
    setReviewPopUp(false);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <div className="popup-header">
          <div className="spacer"></div>
          <div>
            <h4>Write Review</h4>
          </div>
          <div className="navbar-children-left">
            <button className="btn" onClick={() => setReviewPopUp(false)}>
              Close
            </button>
          </div>
        </div>
        <div className="popup-review-product-container">
          <img src={product.image} width={60} height={60} />
          <p className="product-name">{product.name}</p>
        </div>
        <div className="popup-review-container">
          <h4>Choose Your Rating</h4>
          <div>
            {[...Array(5)].map((value, i) => (
              <AiFillStar
                className="review-stars-click"
                key={`${product.id}-${i}`}
                color={i < rating ? "#fdcc0d" : "lightgray"}
                onClick={() => setRating(i + 1)}
                size={30}
              />
            ))}
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              required
            />
            <label htmlFor="title" className="form__label">
              Title
            </label>
          </div>
          <div className="form__group field">
            <textarea
              type="input"
              className="form__field"
              placeholder="Review"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              cols={40}
              rows={5}
              maxLength={3000}
              required
            />
            <label htmlFor="desc" className="form__label">
              Your Review
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
            />
            <label htmlFor="name" className="form__label">
              Name
            </label>
          </div>
          <div>
            <button className="btn" onClick={() => publishReview()}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
