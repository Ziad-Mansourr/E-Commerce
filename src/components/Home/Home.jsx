import React from 'react'
import RecentProduct from '../RecentProduct/RecentProduct';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategorySlider></CategorySlider>
    <RecentProduct></RecentProduct>
    </>
  )
}