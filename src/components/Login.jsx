import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';


const Login = () => {
  const [issignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();   

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignForm = () => {
    setIsSignInForm(!issignInForm);
    setErrorMessage(null);
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Redirection and store update handled automatically by onAuthStateChanged in Header
      })
      .catch((error) => {
        // Map some friendly firebase errors
        if (error.code === "auth/popup-closed-by-user") {
          setErrorMessage("Google Sign-In popup closed before completion.");
        } else if (error.code === "auth/operation-not-allowed") {
          setErrorMessage("Google sign-in is not enabled in Firebase console.");
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value
    );  

    setErrorMessage(message);
    if (message) return;

    if (!issignInForm) {
      // SIGN UP
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVATAR
          }).then(() =>{
            const {uid , email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            
            // Profile updated 
          }).catch((error) => {
            setErrorMessage(error.message);

            // An error occured
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      // SIGN IN
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
         
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div>
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="bg"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
        className="w-[90%] md:w-8/12 lg:w-4/12 xl:w-3/12 absolute p-8 md:p-12 bg-black mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 shadow-2xl z-10"
      >
        <h1 className="font-bold text-3xl py-4">
          {issignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!issignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />

        {/* Error Message */}
        <p className="text-red-500 font-bold text-lg py-2">
          {errorMessage}
        </p>

        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg font-bold cursor-pointer hover:bg-red-800 transition duration-300"
          onClick={handleButtonClick}
        >
          {issignInForm ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex flex-col items-center justify-center mb-4">
          <span className="text-gray-400 text-sm mb-4">OR</span>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 p-3 bg-white text-black hover:bg-gray-200 w-full rounded-lg font-bold cursor-pointer transition duration-300 shadow-md text-sm md:text-base"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>
        </div>

        <p
          className="py-4 cursor-pointer hover:underline text-gray-300 text-sm md:text-base text-center"
          onClick={toggleSignForm}
        >
          {issignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;