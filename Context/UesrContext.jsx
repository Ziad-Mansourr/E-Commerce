import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../src/services/axiosInstance';
export let userContext = createContext();
export default function UesrContextProvider(props) {
    const [userLogin , setUserLogin] = useState(null);
    const [search , setSearch] = useState('');

    function login(values){
     return axiosInstance.post(`auth/signin`, values)
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
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}   
      </userContext.Provider>   
    </>
  )
}
