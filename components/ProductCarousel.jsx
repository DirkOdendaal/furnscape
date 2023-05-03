import React, { useState } from "react";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "swiper/css";
import "swiper/css/free-mode";

const ProductCarousel = ({ products }) => {
  const [swiper, setSwiper] = useState(null);

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const goNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <div>
      <div className="landing-header">
        <h2>Best Selling Products</h2>
      </div>
      <div className="slider-div">
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode, Navigation]}
          className="product-slider"
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            720: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            940: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1160: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1380: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1600: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1820: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
          }}
          onSwiper={setSwiper}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={`${product.id}-slide`}>
              <Product key={product.id} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="slider-buttons">
          <button className="swiper-button-prev" onClick={goPrev}>
            <BsFillArrowLeftCircleFill size={30} />
          </button>
          <button className="swiper-button-next" onClick={goNext}>
            <BsFillArrowRightCircleFill size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
