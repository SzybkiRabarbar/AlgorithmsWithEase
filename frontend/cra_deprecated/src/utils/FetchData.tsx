import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

function FetchData<T>(url: string) {
  const fetchedData = useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const {data} = await axios.get(url);
      return data
    }
  }, queryClient);
  return fetchedData
}

export default FetchData