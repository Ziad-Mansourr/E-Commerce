import React, { useContext, useEffect, useState } from 'react'
import { counterContext } from '../../../Context/CounterContext'
import RecentProduct from '../RecentProduct/RecentProduct';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {
  let {counter , change} = useContext(counterContext);
  return (
    <>
    <MainSlider/>
    <CategorySlider></CategorySlider>
    <RecentProduct></RecentProduct>
    </>
  )
}