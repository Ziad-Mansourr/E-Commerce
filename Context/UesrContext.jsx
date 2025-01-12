import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export let userContext = createContext();
export default function UesrContextProvider(props) {
    const [userLogin , setUserLogin] = useState(null);
    const [search , setSearch] = useState('');

    function login(values){
     return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .then((apiRes)=>{
      // localStorage.setItem('userInfo' ,JSON.stringify(apiRes.data));
      return apiRes; 
  })
    .catch((apiError)=>apiError)
    }
    useEffect(()=>{
      if(localStorage.getItem('userToken') !== null){
        setUserLogin(localStorage.getItem('userToken'));
      }
    },[userLogin])
  return (
    <>
      <userContext.Provider value={{userLogin , setUserLogin , setSearch , search , login}}>
        {props.children}   
      </userContext.Provider>   
    </>
  )
}
