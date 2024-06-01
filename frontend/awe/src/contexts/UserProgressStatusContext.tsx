'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

import fetchDataWithToken from '@/utils/fetchDataWithToken';
import UserProgressStatusDataInterface from '@/utils/interfaces/UserProgressStatusDataInterface';
import { useUserToken } from '@/contexts/UserTokenContext';


interface UserPorgressStatusContextProps {
  userProgressData: UserProgressStatusDataInterface | undefined;
  setUserProgressData: React.Dispatch<React.SetStateAction<UserProgressStatusDataInterface | undefined>>;
  fetchedUserProgressError: Error | null;
  fetchedUserProgressIsLoading: boolean;
}


const UserProgressStatusContext =
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
      setUserProgressData(fetchedUserProgressData);
    }
  });

  return (
    <UserProgressStatusContext.Provider value={
        {
          userProgressData, setUserProgressData,
          fetchedUserProgressError,
          fetchedUserProgressIsLoading,
        }
    }>
      {children}
    </UserProgressStatusContext.Provider>
  );
};