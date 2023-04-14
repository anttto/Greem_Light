import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllArtwork } from "../api/firebase";
// import SwiperCore, { Navigation, Pagination } from "swiper";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
  // SwiperCore.use([Navigation, Pagination]);
  const { data: artworks } = useQuery(["artwork"], () => getAllArtwork());
  return (
    <section>
      <Swiper
        className="w-full h-64"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        // autoplay
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        // breakpoints={{
        //   768: {
        //     slidesPerView: 3,
        //   },
        // }}
      >
        {artworks &&
          artworks.map((product) => (
            <SwiperSlide key={product.productId}>
              <img src={product.url} alt={product.title} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
