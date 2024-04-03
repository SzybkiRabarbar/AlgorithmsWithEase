import axios from 'axios';
import { useMutation, QueryClient } from '@tanstack/react-query';
import PatchUserProgressStatusInterface 
  from '@/utils/interfaces/PatchUserProgressStatusInterface';

const queryClient = new QueryClient();
const url = 'http://127.0.0.1:8000/api/data/patch/user-progress-status/';


function patchUserProgressStatusData() {

  return useMutation({
    mutationFn: (data: PatchUserProgressStatusInterface) => 
      axios.patch(url, data, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        },
      }
    ),
    // onSuccess: () => {
    //   console.log('Mutation successful')
    // },
    // onError: (error) => {
    //   console.error('Mutation failed', error);
    // }
  }, queryClient)
}

export default patchUserProgressStatusData;
