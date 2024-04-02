import axios, { AxiosResponse } from 'axios';
import { useMutation, QueryClient } from '@tanstack/react-query';
import PatchUserActionInterface from '@/utils/interfaces/PatchUserActionInterface';

const queryClient = new QueryClient();
const url = 'http://127.0.0.1:8000/api/post/retrieve-action/'

function patchData() {

  return useMutation({
    mutationFn: (data: PatchUserActionInterface) => 
      axios.patch(url, data, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        },
      }
    ),
    onSuccess: () => {
      console.log('Mutation successful')
    },
    onError: (error) => {
      console.error('Mutation failed', error);
    }
  }, queryClient)
}

export default patchData;
