'use client'

import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

function fetchData<T>(url: string) {
  const fetchedData = useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const {data} = await axios.get(url);
      return data
    },
    staleTime: Infinity,
  }, queryClient);
  return fetchedData
}

export default fetchData