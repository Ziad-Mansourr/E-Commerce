import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/axiosInstance';
export default function useProduct() {
    function getData(){
        return axiosInstance.get(`products`);
      }
      let apiRes = useQuery({
        queryKey:['recentProduct'],
        queryFn:getData,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
      });
  return apiRes
}
