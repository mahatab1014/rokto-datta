import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const google_provider = new GoogleAuthProvider();
  const facebook_provider = new FacebookAuthProvider();
  const twitter_provider = new TwitterAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);

        console.log(loggedUser);
        // const uid = loggedUser.uid;
        // ...
      }

      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUpUser = async (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async (auth) => {
    setUserLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    const profileData = {
      displayName: name,
    };

    if (photo !== null) {
      profileData.photoURL = photo;
    }

    return updateProfile(auth.currentUser, profileData);
  };

  const continueWithGoogle = async () => {
    setUserLoading(true);
    return signInWithPopup(auth, google_provider);
  };

  const continueWithFacebook = async () => {
    setUserLoading(true);
    return signInWithPopup(auth, facebook_provider);
  };

  const continueWithTwitter = async () => {
    setUserLoading(true);
    return signInWithPopup(auth, twitter_provider);
  };

  const authInfo = {
    user,
    userLoading,
    signUpUser,
    signInUser,
    signOutUser,
    continueWithGoogle,
    continueWithFacebook,
    continueWithTwitter,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.any,
};
