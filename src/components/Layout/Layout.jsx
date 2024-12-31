import React, { useContext, useEffect, useState } from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { userContext } from '../../../Context/UesrContext';

export default function Layout() {
  let { userLogin, setUserLogin } = useContext(userContext);
  return (
    <>

<Navbar/>

<div className="container text-center py-28">

<Outlet></Outlet>

</div>
     { (userLogin != null)?
     <Footer/>
    :
    null
    }
    </>
  )
}
