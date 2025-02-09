import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../src/services/axiosInstance';
export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [Cart , setCart] = useState(null);
  let headers = {
        token: localStorage.getItem('userToken'),
    }
function  addToCart(productId){
  return axiosInstance.post(`cart` , 
    {productId:productId},
    {headers}
).then((response)=>response)
.catch((error)=>error)
}

function displayCart(){
    return axiosInstance.get(`cart`,{headers})
    .then((response)=>response)
    .catch((error)=>error)
}

function deleteCart(id){
  return axiosInstance.delete(`cart/${id}`,{headers})
  .then((response)=>response)
  .catch((error)=>error)
}
function deleteUserCart(){
  return axiosInstance.delete(`cart`,{headers})
  .then((response)=>response)
  .catch((error)=>error)
}
function updateCart(id , count){
  return axiosInstance.put(`cart/${id}`,
    {count:count},
    {headers},
  )
  .then((response)=>response)
  .catch((error)=>error)
}


async function getCart(){
  let {data} = await displayCart();
  setCart(data);
  // console.log(data);
  
}

function checkOut(cardId , url , formValue){
  return axiosInstance.post(`orders/checkout-session/${cardId}?url=${url}` , 
    {shippingAddress:formValue},
    {headers},
  )
}

useEffect(()=>{
  getCart()
},[Cart])
    return (
        <>
          <CartContext.Provider value={{Cart , checkOut, getCart ,setCart,  addToCart , displayCart , deleteUserCart , deleteCart , updateCart}}>
           {/* eslint-disable-next-line react/prop-types */}
            {props.children}
          </CartContext.Provider>
        </>
    )
}
