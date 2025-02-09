import { createContext, useEffect, useState } from "react"
import axiosInstance from "../src/services/axiosInstance";
export let WishListContext = createContext();
export function WishListContextProvider(props){

    const [wish , setWish] = useState(null);
    let headers = {
        token: localStorage.getItem('userToken'),
    }

    function addToWishList(id){
        return axiosInstance.post(`wishlist`,
            {productId:id},
            {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }
    function getWishList(){
        return axiosInstance.get(`wishlist`,
            {headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }
    function deleteFromWish(id){
        return axiosInstance.delete(`wishlist/${id}`,
            {headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }

    async function getWish(){
        let {data} = await getWishList();
        setWish(data);
        // console.log(data);
        
      }

       useEffect(()=>{
          getWish()   
        },[wish])
    return <WishListContext.Provider value={{addToWishList  ,getWish,setWish, getWishList , wish , deleteFromWish}}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
    </WishListContext.Provider>
}