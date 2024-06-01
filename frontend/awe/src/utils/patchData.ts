import axios from 'axios';
import { useMutation, QueryClient } from '@tanstack/react-query';

import PatchUserProgressStatusInterface from '@/utils/interfaces/PatchUserProgressStatusInterface';
import { useUserProgressStatus } from '@/contexts/UserProgressStatusContext';
import { useIsPatchingData } from '@/contexts/IsPatchingDataContext';


const queryClient = new QueryClient();
const url = 'http://127.0.0.1:8000/api/data/patch/user-progress-status/';


function patchUserProgressStatusData() {

  const { userProgressData, setUserProgressData } = useUserProgressStatus();
  const { setIsPatchingData } = useIsPatchingData();

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
        setIsPatchingData(false);

        console.log(data.fire_id, data.progress_status);
      }
    },
    onError: (error) => {
      setIsPatchingData(false);
      console.error('Mutation failed', error);
    }
  }, queryClient)
}

export default patchUserProgressStatusData;
