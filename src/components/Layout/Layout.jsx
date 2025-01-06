import React, { useContext, useEffect, useState } from 'react'
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { userContext } from '../../../Context/UesrContext';
import Navbarr from '../Navbarr/Navbarr';

export default function Layout() {
  let { userLogin, setUserLogin } = useContext(userContext);
  return (
    <>

<Navbarr/>

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
