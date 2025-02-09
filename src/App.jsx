import './App.css'
import { lazy, Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import "flowbite";

const Home = lazy(() => import('./components/Home/Home'));
const Card = lazy(() => import('./components/Card/Card'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const ProtectRouting = lazy(() => import('./components/ProtectRouting/ProtectRouting'));
const ProductDetailes = lazy(() => import('./components/ProductDetailes/ProductDetailes'));
const CheckOut = lazy(() => import('./components/CheckOut/CheckOut'));
const WishList = lazy(() => import('./components/WishList/WishList'));
const Products = lazy(() => import('./components/Products/Products'));
const Brands = lazy(() => import('./components/Brands/Brands'));
const Category = lazy(() => import('./components/Category/Category'));
const CategoryDetails = lazy(() => import('./components/CategoryDetails/CategoryDetails'));
const BrandDetails = lazy(() => import('./components/BrandDetails/BrandDetails'));
const ForgetPassword = lazy(() => import('./components/ForgetPassword/ForgetPassword'));
const VerifyEmail = lazy(() => import('./components/VerifyEmail/VerifyEmail'));
const ResetPassword = lazy(() => import('./components/ResetPassword/ResetPassword'));
const UpdatePassword = lazy(() => import('./components/UpdatePassword/UpdatePassword'));
const Search = lazy(() => import('./components/Search/Search'));
const Layout = lazy(() => import('./components/Layout/Layout'));

import CounterContextProvider from '../Context/CounterContext'
import UesrContextProvider from '../Context/UesrContext'
import CartContextProvider from '../Context/CartContext'
import { WishListContextProvider } from '../Context/WishListContext'
import CategoryContextProvider from '../Context/CategoryContext'
import Loading from './components/Loading/Loading';

function App() {

  const queryClient = new QueryClient()
   
  let router = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectRouting><Suspense fallback={<Loading/>}><Home/></Suspense> </ProtectRouting> },
        { path: 'card', element: <ProtectRouting><Suspense fallback={<Loading/>}><Card /></Suspense></ProtectRouting> },
        { path: 'products', element: <ProtectRouting><Suspense fallback={<Loading/>}><Products /></Suspense></ProtectRouting> },
        { path: 'checkout', element: <ProtectRouting><Suspense fallback={<Loading/>}><CheckOut /></Suspense></ProtectRouting> },
        { path: 'category', element: <ProtectRouting><Suspense fallback={<Loading/>}><Category /></Suspense></ProtectRouting> },
        { path: 'categoryDetails/:id/:category', element: <ProtectRouting><Suspense fallback={<Loading/>}><CategoryDetails /></Suspense></ProtectRouting> },
        { path: 'brandsDetails/:id/:brands', element: <ProtectRouting><Suspense fallback={<Loading/>}><BrandDetails /></Suspense></ProtectRouting> },
        { path: 'brand', element: <ProtectRouting><Suspense fallback={<Loading/>}><Brands /></Suspense></ProtectRouting> },
        { path: 'wishList', element: <ProtectRouting><Suspense fallback={<Loading/>}><WishList /></Suspense></ProtectRouting> },
        { path: 'search', element: <ProtectRouting><Suspense fallback={<Loading/>}><Search /></Suspense></ProtectRouting> },
        { path: 'productDetailes/:id/:category', element: <ProtectRouting><Suspense fallback={<Loading/>}><ProductDetailes /></Suspense></ProtectRouting> },
        { path: 'login', element: <Suspense fallback={<Loading/>}><Login /></Suspense> },
        { path: 'verify', element: <Suspense fallback={<Loading/>}><VerifyEmail /></Suspense> },
        { path: 'reset', element: <Suspense fallback={<Loading/>}><ResetPassword /></Suspense> },
        { path: 'updatePassword', element: <Suspense fallback={<Loading/>}><UpdatePassword /></Suspense> },
        { path: 'forgetPassword', element: <Suspense fallback={<Loading/>}><ForgetPassword /></Suspense> },
        { path: 'Register', element: <Suspense fallback={<Loading/>}><Register /></Suspense> }
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
