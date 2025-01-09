  import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function MainSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <>
          <div className="grid grid-cols-12 w-[90%] m-auto h-[300px] md:h-[400] lg:h-[450px] overflow-hidden ">
          <div className="col-span-12 md:col-span-8 ">
          <Slider className=''  {...settings}>
             <img src="s3.jpg" className='w-full' alt="" /> 
             <img src="s4.jpg" className='w-full' alt="" /> 
          </Slider>
            </div> 
           <div className="col-span-6 md:col-span-4 flex md:block rounded-none">
             <img src="s1.jpg" className='w-full md:h-[150px] lg:h-[250px] rounded-none' alt="" /> 
             <img src="s2.png" className='w-full md:h-[149px] lg:h-[250px] rounded-none' alt="" /> 
            
            </div>
          </div>
    </>
  )
}
