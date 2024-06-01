'use client'

import { useIsPatchingData } from "@/contexts/IsPatchingDataContext";
import { useUserProgressStatus } from "@/contexts/UserProgressStatusContext";
import { useUserToken } from "@/contexts/UserTokenContext";
import patchUserProgressStatusData from "@/utils/patchData";


function useChangeUserProgressStatus() {

  const { userToken } = useUserToken();
  const { userProgressData } = useUserProgressStatus();
  const { setIsPatchingData } = useIsPatchingData();
  const mutation = patchUserProgressStatusData();
  
  return (groupId: number, type_: string, fireId: string, action: number) => {

    if (userProgressData && userToken !== null) {
      // Check and initialize groupId
      if (!userProgressData.hasOwnProperty(groupId)) {
          userProgressData[groupId] = {};
      }
      // Check and initialize type_
      if (!userProgressData[groupId].hasOwnProperty(type_)) {
          userProgressData[groupId][type_] = {};
      }
      // Check and initialize fireId
      if (!userProgressData[groupId][type_].hasOwnProperty(fireId)) {
          userProgressData[groupId][type_][fireId] = 0;
      }

      let status = userProgressData[groupId][type_][fireId];

      if (status == 3 || status == action) {
        status -= action;
      } else {
        status += action;
      }
      
      setIsPatchingData(true);
      mutation.mutate({
        token: userToken,
        fire_id: fireId,
        group_id: groupId,
        type_: type_,
        progress_status: status,
      });
    }
  }
}

export default useChangeUserProgressStatus