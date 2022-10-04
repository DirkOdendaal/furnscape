import React from "react";
import { AiFillStar } from "react-icons/ai";

const Reviews = ({ review }) => {
  //getUserInfo
  return (
    <div className="review-list-item">
      <div>
        <h4>{review.user}</h4>
        {[...Array(5)].map((value, i) => (
          <AiFillStar
            key={value}
            color={i < review.review ? "#2cdd82" : "lightgray"}
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
