import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Card from './components/Card/Card';
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import CounterContextProvider from '../Context/CounterContext'
import UesrContextProvider from '../Context/UesrContext'
import ProtectRouting from './components/ProtectRouting/ProtectRouting'
import ProductDetailes from './components/ProductDetailes/ProductDetailes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider, { CartContext } from '../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import { WishListContext, WishListContextProvider } from '../Context/WishListContext'
import WishList from './components/WishList/WishList'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Category from './components/Category/Category'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import CategoryContextProvider from '../Context/CategoryContext'
import BrandDetails from './components/BrandDetails/BrandDetails'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyEmail from './components/VerifyEmail/VerifyEmail'
import ResetPassword from './components/ResetPassword/ResetPassword'
import "flowbite";
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import Search from './components/Search/Search'
function App() {

  const queryClient = new QueryClient()
   
  let router = createHashRouter([
    {

      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectRouting><Home /></ProtectRouting> },
        { path: 'card', element: <ProtectRouting><Card /></ProtectRouting> },
        { path: 'products', element: <ProtectRouting><Products /></ProtectRouting> },
        { path: 'checkout', element: <ProtectRouting><CheckOut /></ProtectRouting> },
        { path: 'category', element: <ProtectRouting><Category /></ProtectRouting> },
        { path: 'categoryDetails/:id/:category', element: <ProtectRouting><CategoryDetails /></ProtectRouting> },
        { path: 'brandsDetails/:id/:brands', element: <ProtectRouting><BrandDetails /></ProtectRouting> },
        { path: 'brand', element: <ProtectRouting><Brands /></ProtectRouting> },
        { path: 'wishList', element: <ProtectRouting><WishList /></ProtectRouting> },
        { path: 'details', element: <ProtectRouting><Details /></ProtectRouting> },
        { path: 'search', element: <ProtectRouting><Search /></ProtectRouting> },
        { path: 'productDetailes/:id/:category', element: <ProtectRouting><ProductDetailes /></ProtectRouting> },
        { path: 'login', element: <Login /> },
        { path: 'logout', element: <Logout /> },
        { path: 'verify', element: <VerifyEmail /> },
        { path: 'reset', element: <ResetPassword /> },
        { path: 'updatePassword', element: <UpdatePassword /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'Register', element: <Register /> }
      ]
    }
  ])
  return (
    <>
    <WishListContextProvider>
      <CartContextProvider>
        <CategoryContextProvider>
        <QueryClientProvider client={queryClient}>
          <UesrContextProvider>
            <CounterContextProvider>
              <RouterProvider router={router}></RouterProvider>
              {/* <ReactQueryDevtools /> */}
              <Toaster />
            </CounterContextProvider>
          </UesrContextProvider>
        </QueryClientProvider>
        </CategoryContextProvider>
      </CartContextProvider>
    </WishListContextProvider>
    </>
  )
}

export default App
