import React, { useEffect, useState } from 'react'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom';
export default function Category() {

  let { data, isLoading } = useCategory();

  if (isLoading) {
    return <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
      <span className="loader text-4xl" />
    </div>
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-5 w-[90%] m-auto">

        {data?.data?.data?.map((product) =>
          <div key={product._id} className="col-span-12 p-3 md:col-span-4 group relative lg:col-span-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-lg h-[380px] md:h-[250px] w-full" src={product.image} alt='' />
            <Link to={`/categoryDetails/${product._id}/${product.name}`}>
              <div className="">
                <h3 className='text-blue-400'>{product.name}</h3>
                <button className='pt-2 relative top-[150px] transition-all hover:bg-green-700 text-white duration-[.3s] group-hover:top-2  bg-green-400 w-full'>Show</button>
              </div>
            </Link>
          </div>

        )}
      </div>



    </>
  )
}
