'use client'

import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";


const queryClient = new QueryClient();
const prefix = 'http://127.0.0.1:8000/api';


function fetchDataWithToken<T>(url: string, token: string | null) {

  const fetchedData = useQuery<T>({
    queryKey: [prefix + url],
    queryFn: async () => {
      const {data} = await axios.get(prefix + url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      return data
    },
    staleTime: Infinity,
    enabled: token !== null,
  }, queryClient);
  return fetchedData
}

export default fetchDataWithToken