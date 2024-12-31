import React, { createContext, useState } from 'react'

export let counterContext = createContext(0);
export default function CounterContextProvider(props) {
    const [counter , setCounter] = useState(5);
 function change(){
   setCounter( Math.random())
 }
  return <counterContext.Provider value={{counter,change}}>
           {props.children}
        </counterContext.Provider>  
 
}
