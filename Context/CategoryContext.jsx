import  { createContext} from 'react'
import axiosInstance from '../src/services/axiosInstance';
export let CategoryContext = createContext();
export default function CategoryContextProvider(props) {
    function getCategory(id){
        return axiosInstance.get(`categories/${id}`)
        .then((response)=> response)
        .catch((error)=>error)
    }
    return (
        <>
            <CategoryContext.Provider value={{getCategory}}>
                {/* eslint-disable-next-line react/prop-types */}
                {props.children}
            </CategoryContext.Provider>
        </>
    )
}
