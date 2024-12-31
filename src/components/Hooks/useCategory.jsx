import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
export default function useCategory() {
    function getData(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
      let apiRes = useQuery({
        queryKey:['recentCategory'],
        queryFn:getData,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
      });
  return apiRes
}
