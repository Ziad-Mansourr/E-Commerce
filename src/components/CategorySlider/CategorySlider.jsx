import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import useCategory from '../Hooks/useCategory';
export default function CategorySlider() {
  const [category, setCategory] = useState(null);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4 ,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  function getAllProduct(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
let {data} = useCategory();
  return (
    <>

          <Slider className='my-10 pb-2 w-[90%] m-auto'  {...settings}>
            {data?.data?.data?.map((porduct) => <img key={porduct?._id} className='h-[300px] w-full'  src={porduct?.image} alt="" />)}
          </Slider>
    </>
  )
}
