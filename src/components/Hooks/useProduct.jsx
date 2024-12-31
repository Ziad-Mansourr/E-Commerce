import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
export default function useProduct() {
    function getData(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
      let apiRes = useQuery({
        queryKey:['recentProduct'],
        queryFn:getData,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
      });
  return apiRes
}
