import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../../Context/UesrContext'
import { CartContext } from '../../../Context/CartContext'
import { WishListContext } from '../../../Context/WishListContext'
import { Avatar, Dropdown, Navbar, FloatingLabel } from "flowbite-react";
import { useFormik } from 'formik'
import useProduct from '../Hooks/useProduct'
export default function Navbarr() {
  let { Cart } = useContext(CartContext);
  let { wish } = useContext(WishListContext);
  let navigate = useNavigate();
  let { userLogin, setUserLogin , setSearch} = useContext(userContext);
  let x = localStorage.getItem('userInfo');
  let userLoginDe = JSON.parse(x);
  

  function handleSearch(values) {
    setSearch(values.search);
    navigate('/search')
      
  }

  let formik = useFormik(
    {
      initialValues: {
        search: '',
      },
      onSubmit: handleSearch,
    }
  )


  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/login');
    setUserLogin(null);
  }
  return (
    <>

      <Navbar fluid rounded className='  bg-white mb-9 shadow-lg fixed top-0 left-0 right-0 z-20 border-gray-200'>
        <div className="w-[91%] flex flex-wrap items-center justify-between mx-auto ">
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="logo-DO4oPZ_r.png" className="h-8" alt="FreshCart Logo" />
          </Link>
          {userLogin !== null ?
            <>
              <div className="flex md:order-2 vip  md:me-0 ">

                <div className="flex justify-between mr-[105px]  md:mr-0 items-center px-4 ">
                  <Link to={'/card'}>
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="badge badge-md indicator-item">{Cart?.numOfCartItems}</span>
                    </div>
                  </Link>
                  <div className="relative inline-flex">
                    <Link to={'/wishList'}>
                      <p className="flex items-center rounded-md bg-transparent text-black py-2.5 px-3 border border-transparent text-center text-sm  transition-all active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <i className="fa-solid fa-heart text-2xl text-green-500" />
                      </p>
                    </Link>
                  </div>
                </div>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <span className='text-xl text-white'>{userLoginDe?.user?.name.split('').slice(0, 1)}</span>
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{userLoginDe?.user?.name}</span>
                    <span className="block truncate text-sm font-medium">{userLoginDe?.user?.email}</span>
                  </Dropdown.Header>
                  <div className="flex items-center text-gray-700 border border-t-0 border-x-0 mb-2 border-b-gray-300">
                    <Link to={'/updatePassword'} className=" text-center px-4 py-2 text-sm text-green-500">Update Password</Link>
                  </div>
                  <div className="flex justify-center items-center text-gray-700 vip1">
                    <button onClick={logout} className=" text-center px-4 py-2 text-sm ">Sign out</button>
                  </div>
                </Dropdown>
                <Navbar.Toggle />
              </div>
              <Navbar.Collapse className=''>
                <NavLink to={''} className="block py-2 px-3 text-lg font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 " >Home</NavLink>

                <NavLink to={'products'} className="block py-2 px-3 text-lg font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 ">Product</NavLink>

                <NavLink to={'category'} className="block py-2 px-3 text-lg font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 ">Category</NavLink>

                <NavLink to={'brand'} className="block py-2 px-3 text-lg font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 ">Brands</NavLink>
                
                <form  onSubmit={formik.handleSubmit}>
                <div className="flex justify-between items-center gap-2" >
                  <input type="text" name='search' id="search" value={formik.values.search} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search..." />
                  <button type="submit" className='p-0'>
                  <div className="py-2 px-3  bg-green-500 rounded-md">
                    <i className='fa-solid fa-search text-white'></i>
                  </div>
                  </button>
                </div>
                </form>

              </Navbar.Collapse>

            </>
            : <div className="flex md:order-2 vip  md:me-0 ">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <i className="fa-regular fa-user"></i>
                }
              >
                <NavLink to={'login'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</NavLink>
                <NavLink to={'register'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Up</NavLink>
              </Dropdown>
              <Navbar.Toggle />
            </div>

          }
        </div>
      </Navbar>
    </>
  )
}


