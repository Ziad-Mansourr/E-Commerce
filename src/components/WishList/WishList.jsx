import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../Context/CartContext';
import { WishListContext } from '../../../Context/WishListContext';
import toast, { Toaster } from 'react-hot-toast';
export default function WishList() {
  const { addToCart } = useContext(CartContext);
  const { getWishList, deleteFromWish } = useContext(WishListContext);
  const [disWish, setDisWish] = useState(null);
  async function displayWish() {
    let { data } = await getWishList();
    setDisWish(data);
  }
  async function deleteWish(id) {
    let { data } = await deleteFromWish(id);
    toast.loading('Removing Product From WishList');
    if (data?.status == 'success') {
      setTimeout(() => {
        toast.dismiss();
        toast.success(data?.message)
      }, 600)
    }
  }

  async function addCart(id) {
    let { data } = await addToCart(id);
    toast.loading('Adding Product To Cart');
    setTimeout(() => {
      if (data.status == 'success') {
        toast.dismiss()
        toast.success(data?.message);
      }
    }, 800)
  }
  useEffect(() => {
    displayWish()
  }, [disWish])
  return (
    <>
      {(disWish?.data?.length) ?
        <>
          <div className="relative overflow-x-auto w-[90%] m-auto shadow-md sm:rounded-lg">
            <h1 className='mb-7 text-teal-700 col-span-12'>My WishList</h1>
            {/* <div className="overflow-x-auto col-span-12 ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only"></span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Add To Cart
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {disWish?.data?.map((product) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img loading="lazy" src={product.imageCover} className="rounded-full w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                      </td>
                      <td className="px-4 py-4 w-[200px] font-semibold text-gray-900 dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </td>
                      <td className="px-4 py-4 text-gray-900 font-semibold">
                        {product?.brand?.name}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-0 py-4 font-semibold text-gray-900 dark:text-white">
                        <button onClick={() => addCart(product.id)} className="hover:bg-green-400 w-[65%] hover:text-white transition-all duration-[0.4s] bg-transparent border-green-400 text-teal-700 mt-2">
                          <i className="fa-solid fa-plus"></i> Add To Cart
                        </button>
                      </td>
                      <td className="px-0 py-4">
                        <button onClick={() => deleteWish(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}

            {
              disWish?.data?.map((product) =>
                <div key={product.id} className="flex flex-wrap items-center p-3  justify-between">
                  <div className=" w-[100%] lg:w-[55%]  flex flex-nowrap items-center">
                    <div className="w-[35%] md:w-[15%] lg:w-[20%] ">
                      <img src={product.imageCover} alt={product.title} className='' />
                    </div>
                    <p className='pl-14 font-medium'>	{product.title}</p>
                  </div>
                  <div className="flex w-[100%] lg:w-[40%]  justify-between items-center">
                    <p className='font-medium'>{product.price} EGP</p>
                    <button onClick={() => addCart(product.id)} className="hover:bg-green-400 w-[40%] lg:w-[35%]  text-sm hover:text-white transition-all duration-[0.4s] bg-transparent border-green-400 text-teal-700 mt-2">
                      <i className="fa-solid fa-plus"></i> Add To Cart
                    </button>
                    <button onClick={() => deleteWish(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              )
            }
          </div>

        </>

        :
        <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
        <span className="loader text-4xl" />
        </div>

      }

    </>
  )
}
