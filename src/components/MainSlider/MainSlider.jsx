import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <>
          {/* <Slider className='my-10 pb-2 W-[90%] m-auto'  {...settings}>
              <img className='w-full' src="./assets/react.svg" alt="" />
              <img className='w-full' src="./../assets/freshcart.svg" alt="" />
              <img className='w-full' src="./assets/react.svg" alt=""/>
          </Slider> */}
    </>
  )
}
