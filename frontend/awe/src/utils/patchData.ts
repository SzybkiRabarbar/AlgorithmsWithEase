import axios from 'axios';
import { useMutation, QueryClient } from '@tanstack/react-query';
import PatchUserProgressStatusInterface from '@/utils/interfaces/PatchUserProgressStatusInterface';
import { useUserProgressStatus } from '@/components/user-progress-status-context/UserProgressStatusContext';

const queryClient = new QueryClient();
const url = 'http://127.0.0.1:8000/api/data/patch/user-progress-status/';


function patchUserProgressStatusData() {

  const { userProgressData, setUserProgressData } = useUserProgressStatus();

  return useMutation({
    mutationFn: (data: PatchUserProgressStatusInterface) => 
      axios.patch(url, data, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        },
      }
    ),
    onSuccess: (_, data) => {
      if (userProgressData) {
        userProgressData[data.group_id][data.type_][data.fire_id] =
          data.progress_status;

        setUserProgressData({ ...userProgressData });

        console.log(data.fire_id, data.progress_status);
      }
    },
    onError: (error) => {
      console.error('Mutation failed', error);
    }
  }, queryClient)
}

export default patchUserProgressStatusData;
