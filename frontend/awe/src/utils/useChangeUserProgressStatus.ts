'use client'

import { useUserProgressStatus } from "@/components/user-progress-status-context/UserProgressStatusContext";
import { useUserToken } from "@/components/user-token-context/UserTokenContext";
import patchUserProgressStatusData from "@/utils/patchData";


function useChangeUserProgressStatus() {

  const { userToken } = useUserToken();
  const { userProgressData } = useUserProgressStatus();
  const mutation = patchUserProgressStatusData();
  
  return (groupId: number, isProblem: boolean, fireId: string, action: number) => {

    const type_ = isProblem ? 'problems' : 'articles';

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