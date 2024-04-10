'use client'

import { useState, useContext, createContext, ReactNode } from 'react';


interface IsPatchingDataProps {
  isPatchingData: boolean;
  setIsPatchingData: React.Dispatch<React.SetStateAction<boolean>>;
}


const IsPatchingDataContext =
  createContext<IsPatchingDataProps | undefined>(undefined);


export const useIsPatchingData = () => {
  const context = useContext(IsPatchingDataContext);
  if (context === undefined) {
    throw new Error(
      'useIsPatchingData must be used within a IsPatchingDataProvider');
  }
  return context;
}


export const IsPatchingDataProvider: React.FC<{children: ReactNode}> = 
({ children }) => {
  const [isPatchingData, setIsPatchingData] = useState<boolean>(false);

  return (
    <IsPatchingDataContext.Provider value={{ isPatchingData, setIsPatchingData }}>
      {children}
    </IsPatchingDataContext.Provider>
  );
}