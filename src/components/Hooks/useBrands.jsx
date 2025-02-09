import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/axiosInstance';
export default function useBrands() {
    function getData(){
        return axiosInstance.get(`brands`);
      }
      let apiRes = useQuery({
        queryKey:['recentBrands'],
        queryFn:getData,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
      });
  return apiRes
}
