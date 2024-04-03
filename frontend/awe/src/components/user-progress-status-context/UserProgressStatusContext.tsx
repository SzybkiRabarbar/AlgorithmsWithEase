'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import fetchDataWithToken from '@/utils/fetchDataWithToken';
import UserProgressStatusDataInterface from '@/utils/interfaces/UserProgressStatusDataInterface';
import { useUserToken } from '../user-token-context/UserTokenContext';


interface UserPorgressStatusContextProps {
  userProgressData: UserProgressStatusDataInterface | undefined;
  setUserProgressData: React.Dispatch<React.SetStateAction<UserProgressStatusDataInterface | undefined>>;
  fetchedUserProgressError: Error | null;
  // setUserProgressError: React.Dispatch<React.SetStateAction<Error | null>>;
  fetchedUserProgressIsLoading: boolean;
  // setUserProgressIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


export const UserProgressStatusContext =
  createContext<UserPorgressStatusContextProps | undefined>(undefined);


export const useUserProgressStatus = () => {
  const context = useContext(UserProgressStatusContext);
  if (context === undefined) {
    throw new Error('useUserToken must be used within a UserTokenProvider');
  }
  return context;
}


export const UserProgressStatusProvider: React.FC<{children: ReactNode}> =
({ children }) => {
  const { userToken } = useUserToken();

  const [userProgressData, setUserProgressData] = 
    useState<UserProgressStatusDataInterface | undefined>(undefined);
  // const [userProgressError, setUserProgressError] =
  //   useState<Error | null>(null);
  // const [userProgressIsLoading, setUserProgressIsLoading] =
  //   useState<boolean>(false);

  const {
      data: fetchedUserProgressData,
      error: fetchedUserProgressError,
      isLoading: fetchedUserProgressIsLoading
  } = 
    fetchDataWithToken<UserProgressStatusDataInterface>(
      '/data/get/user-progress-status/', userToken
    );

  useEffect(() => {
    if (!fetchedUserProgressIsLoading) {
      console.log('setUserProgressData');
      setUserProgressData(fetchedUserProgressData);
      // setUserProgressError(fetchedUserProgressError);
      // setUserProgressIsLoading(fetchedUserProgressIsLoading);
    }
  });

  return (
    <UserProgressStatusContext.Provider value={
        {
          userProgressData, setUserProgressData,
          fetchedUserProgressError,   // setUserProgressError,
          fetchedUserProgressIsLoading,  // setUserProgressIsLoading
        }
    }>
      {children}
    </UserProgressStatusContext.Provider>
  );
};