import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
export default function useBrands() {
    function getData(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      }
      let apiRes = useQuery({
        queryKey:['recentBrands'],
        queryFn:getData,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
      });
  return apiRes
}
