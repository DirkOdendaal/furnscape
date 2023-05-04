import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { query, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useStateContext } from "../context/StateContext";
import Category from "./Category";

import "swiper/css";

const HeroBanner = () => {
  const { catagories, setCatagories } = useStateContext();
  const progressContent = useRef(null);

  useEffect(() => {
    const catRef = collection(db, "catagories");
    const catq = query(catRef);
    getDocs(catq)
      .then((snapshot) => {
        setCatagories(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <div className="hero-banner-container">
      <div className="hero-details-card hero-card" id="hero-nav">
        <div className="hero-details-card-header">
          <h3>Shop By Category</h3>
        </div>
        <ul className="nav">
          {catagories?.map((cat) => (
            <Category key={cat.id} category={cat} />
          ))}
        </ul>
      </div>
      <div className="carousel-container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide>
            <img
              src="/furnscape/CarouselImage1.jpg"
              className="swiper-img"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/furnscape/CarouselImage2.jpg"
              className="swiper-img"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/furnscape/CarouselImage3.jpg"
              className="swiper-img"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/furnscape/CarouselImage4.jpg"
              className="swiper-img"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/furnscape/CarouselImage5.jpg"
              className="swiper-img"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/furnscape/CarouselImage6.jpg"
              className="swiper-img"
            ></img>
          </SwiperSlide>

          <div className="autoplay-progress" slot="container-end">
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroBanner;
