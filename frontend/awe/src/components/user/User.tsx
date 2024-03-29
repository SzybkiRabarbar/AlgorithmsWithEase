'use client'

import getFirebaseConfig from "@/utils/getFirebaseConfig";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";


const app: FirebaseApp = initializeApp(getFirebaseConfig());


export default function User() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    if (typeof window !== 'undefined' && !isUserLoggedIn) {
      const firebaseui = require('firebaseui');
      const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
          GoogleAuthProvider.PROVIDER_ID,
          EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      };
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth());
      ui.start('#firebaseui-auth-container', uiConfig);
      return () => {
        ui.reset();
        unsubscribe();
      };
    }
  }, [isUserLoggedIn]);

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!isUserLoggedIn && <div id="firebaseui-auth-container"></div>}
      {isUserLoggedIn && <button onClick={handleSignOut}>SignOut</button>}
    </div>
  );
};