import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [Cart , setCart] = useState(null);
  let headers = {
        token: localStorage.getItem('userToken'),
    }
function  addToCart(productId){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    {productId:productId},
    {headers}
).then((response)=>response)
.catch((error)=>error)
}

function displayCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((response)=>response)
    .catch((error)=>error)
}

function deleteCart(id){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
  .then((response)=>response)
  .catch((error)=>error)
}
function updateCart(id , count){
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
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
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}` , 
    {shippingAddress:formValue},
    {headers},
  )
}

useEffect(()=>{
  getCart()
},[Cart])
    return (
        <>
          <CartContext.Provider value={{Cart , checkOut, getCart ,setCart,  addToCart , displayCart , deleteCart , updateCart}}>
            {props.children}
          </CartContext.Provider>
        </>
    )
}
