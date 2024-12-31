import axios from "axios";
import { createContext, useEffect, useState } from "react"
export let WishListContext = createContext();
export function WishListContextProvider(props){

    const [wish , setWish] = useState(null);
    let headers = {
        token: localStorage.getItem('userToken'),
    }

    function addToWishList(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {productId:id},
            {headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }
    function getWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }
    function deleteFromWish(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
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
        {props.children}
    </WishListContext.Provider>
}