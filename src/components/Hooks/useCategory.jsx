import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/axiosInstance';
export default function useCategory() {
    function getData(){
        return axiosInstance.get(`categories`);
    }
      let apiRes = useQuery({
        queryKey:['recentCategory'],
        queryFn:getData,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
      });
  return apiRes
}
