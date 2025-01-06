import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../../Context/UesrContext'
import { CartContext } from '../../../Context/CartContext'
import { WishListContext } from '../../../Context/WishListContext'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
export default function Navbarr() {
  let { Cart } = useContext(CartContext);
  let { wish } = useContext(WishListContext);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(userContext);
  let x = localStorage.getItem('userInfo');
  let userLoginDe = JSON.parse(x);


  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/login');
    setUserLogin(null);
  }
  return (
    <>


      {/* <nav className="bg-white mb-9 shadow-lg fixed top-0 left-0 right-0 z-20 border-gray-200 dark:bg-gray-900">
        <div className="w-[90%] flex flex-wrap items-center justify-between mx-auto px-2 py-4">
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="logo-DO4oPZ_r.png" className="h-8" alt="FreshCart Logo" />
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul>
              <li>
                <div className="flex justify-between items-center px-4 ">
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
                      <button className="flex items-center rounded-md bg-transparent text-black py-2.5 px-3 border border-transparent text-center text-sm  transition-all active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <i className="fa-solid fa-heart text-2xl text-green-500" />
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <button type="button" className="flex items-center text-center text-sm bg-green-500 w-12 h-12 rounded-full md:me-0 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <span className='text-xl text-white'>{userLoginDe?.user?.name.split('').slice(0, 1)}</span>
            </button>
            {userLogin !== null ?
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{userLoginDe?.user?.name}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userLoginDe?.user?.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">

                  <li onClick={logout}>
                    <Link className="block text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                  </li>
                </ul>
              </div>
              :
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink to={'login'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</NavLink>
                  </li>

                  <li>
                    <NavLink to={'register'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Up</NavLink>
                  </li>
                </ul>
              </div>
            }
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          {userLogin !== null ?
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to={''} className=" block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Home</NavLink>
                </li>
                <li>
                  <NavLink to={'products'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Peoduct</NavLink>
                </li>
                <li>
                  <NavLink to={'category'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Category</NavLink>
                </li>
                <li>
                  <NavLink to={'brand'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
                </li>
              </ul>
            </div>
            : null
          }
        </div>
      </nav> */}


      <Navbar fluid rounded className='  bg-white mb-9 shadow-lg fixed top-0 left-0 right-0 z-20 border-gray-200'>
        <div className="w-[91%] flex flex-wrap items-center justify-between mx-auto ">
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="logo-DO4oPZ_r.png" className="h-8" alt="FreshCart Logo" />
          </Link>
          {userLogin !== null ?
            <>
              <div className="flex md:order-2 vip  md:me-0 ">

                <div className="flex justify-between mr-[49px] md:mr-0 items-center px-4 ">
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
                  <div className="flex justify-center items-center text-gray-700 vip1">
                  <button onClick={logout} className=" text-center px-4 py-2 text-sm ">Sign out</button>
                  </div>
                </Dropdown>
                <Navbar.Toggle />
              </div>
              <Navbar.Collapse className=''>
                <NavLink to={''} className="block py-2 px-3 text-lg font-medium text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 " >Home</NavLink>

                <NavLink to={'products'} className="block py-2 px-3 text-lg font-medium text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 ">Product</NavLink>

                <NavLink to={'category'} className="block py-2 px-3 text-lg font-medium text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 ">Category</NavLink>

                <NavLink to={'brand'} className="block py-2 px-3 text-lg font-medium text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 ">Brands</NavLink>

              </Navbar.Collapse>

            </>
            : <div className="flex md:order-2 vip  md:me-0 ">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <i class="fa-regular fa-user"></i>
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


