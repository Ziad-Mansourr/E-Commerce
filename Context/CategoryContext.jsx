import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export let CategoryContext = createContext();
export default function CategoryContextProvider(props) {
    function getCategory(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        .then((response)=> response)
        .catch((error)=>error)
    }
    return (
        <>
            <CategoryContext.Provider value={{getCategory}}>
                {props.children}
            </CategoryContext.Provider>
        </>
    )
}
