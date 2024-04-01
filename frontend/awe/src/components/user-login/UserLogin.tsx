'use client'

import './UserLogin.scss';
import getFirebaseConfig from "@/utils/getFirebaseConfig";
import { FirebaseApp, initializeApp } from "firebase/app";
import { 
  getAuth, EmailAuthProvider, GoogleAuthProvider,
  onAuthStateChanged, signOut, GithubAuthProvider 
} from "firebase/auth";
import { useEffect, useState } from "react";


const app: FirebaseApp = initializeApp(getFirebaseConfig());


export default function User() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsUserLoggedIn(true);
        setUserName(user.displayName || "Unknown");
        setUserEmail(user.email || "Unknown");
      } else {
        setIsUserLoggedIn(false);
      }
    });

    if (typeof window !== 'undefined' && !isUserLoggedIn) {
      const firebaseui = require('firebaseui');
      const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
          GithubAuthProvider.PROVIDER_ID,
          GoogleAuthProvider.PROVIDER_ID,
          EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      };
      const ui = firebaseui.auth.AuthUI.getInstance() || 
                 new firebaseui.auth.AuthUI(getAuth());
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
    <>
      {!isUserLoggedIn && (
        <div id="firebaseui-auth-container"></div>
      )}
      {isUserLoggedIn && (
        <div className="user-info">
          <span className="email-label">
            Logged in with
          </span> <br />
          <span className="user-email">
            {userEmail}
          </span> <br /><br />
          <button className="sign-out-button" onClick={handleSignOut}>
            SignOut
          </button>
        </div>
      )}
    </>
  );
};