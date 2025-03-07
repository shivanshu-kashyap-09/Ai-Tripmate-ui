import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import hellojava from "../assets/back.jpg";
import "swiper/css";

const places = [
  { name: "Paris", img: hellojava },
  { name: "Bali", img: hellojava },
  { name: "New York", img: hellojava }
];

const Recommended = () => {
  return (
    <section id="recommended" className=" ">
      <h2 className="text-5xl text-blue-900 text-center font-bold bg-white p-6 ">RECOMMENDED PLACES</h2>
      <Swiper spaceBetween={20} slidesPerView={1} className="container mx-auto">
        {places.map((place, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              <img src={place.img} alt={place.name} className="w-full h-100  object-cover rounded-lg" />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Recommended;