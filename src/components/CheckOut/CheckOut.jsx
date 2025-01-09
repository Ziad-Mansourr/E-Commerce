import React, { useContext, useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yp from 'yup'
import axios from 'axios'
import { CartContext } from '../../../Context/CartContext'
export default function CheckOut() {
  let { checkOut, Cart } = useContext(CartContext);
  // console.log(Cart);

  const [cartId, setCartId] = useState();
  const [url, setUrl] = useState();
  const [load, setLoad] = useState(false);
  let formik = useFormik(
    {
      initialValues: {
        details: '',
        phone: '',
        city: '',
      },
      onSubmit: () => checkout(Cart.cartId, location.origin),
    }
  )
  async function checkout(cartId, url) {
    setLoad(true);
    let { data } = await checkOut(cartId, url, formik.values);
    console.log(data);
    if(data?.status == 'success'){
      setLoad(false);
      location.href = data?.session?.url;
    }
  }

  return (
    <>
      <section className='w-[90%] text-start m-auto mt-8'>
        <form className="" onSubmit={formik.handleSubmit}>

          <div className="relative z-0 w-full mb-10 group">
            <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />

            <label htmlFor="details" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />

            <label htmlFor="phone" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />

            <label htmlFor="city" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
          </div>

          <div className="w-full justify-center items-center flex flex-col">
            <button type="submit" className="text-white text-md bg-green-500 hover:bg-green-700 transition-all  duration-200 font-medium rounded-lg  px-32    py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {load ? <i className='fas fa-spinner fa-spin px-2' ></i> : 'Pay Now'}
            </button>
          </div>

        </form>
      </section>

    </>
  )
}
