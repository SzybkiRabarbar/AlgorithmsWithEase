'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

interface UserTokenContextProps {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}


const UserTokenContext =
  createContext<UserTokenContextProps | undefined>(undefined);


export const useUserToken = () => {
  const context = useContext(UserTokenContext);
  if (context === undefined) {
    throw new Error('useUserToken must be used within a UserTokenProvider');
  }
  return context;
};


export const UserTokenProvider: React.FC<{children: ReactNode}> = 
({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <UserTokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  );
};