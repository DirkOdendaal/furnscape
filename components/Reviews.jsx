import React from "react";
import { AiFillStar } from "react-icons/ai";

const Reviews = ({ review }) => {
  //getUserInfo
  return (
    <div className="review-list-item">
      <div className="user-review">
        <h4>{review.name}</h4>
        {[...Array(5)].map((value, i) => (
          <AiFillStar
            key={`${review.id}-${i}`}
            color={i < review.review ? "#fdcc0d" : "lightgray"}
          />
        ))}
      </div>
      <div className="review-desc">
        <h5>{review.title}</h5>
        <p>{review.desc}</p>
      </div>
    </div>
  );
};

export default Reviews;
