import React, { useState, useEffect } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
  };

  useEffect(() => {
    const timer = setTimeout(goToNextSlide, 10000);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-image-container ${
            index === currentImageIndex ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="carousel-buttons">
        <button onClick={handlePrevClick}>
          <BsArrowBarLeft size={35} />
        </button>
        <button onClick={handleNextClick}>
          <BsArrowBarRight size={35} />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
