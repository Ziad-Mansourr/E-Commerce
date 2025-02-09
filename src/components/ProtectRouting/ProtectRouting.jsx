
import { Navigate } from 'react-router-dom'

export default function ProtectRouting(props) {
  if(localStorage.getItem('userToken') !== null){
    {/* eslint-disable-next-line react/prop-types */}
   return props.children
  }else{
    return <Navigate to={'/login'}/>
  }
}
