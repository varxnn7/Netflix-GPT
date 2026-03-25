import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
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
      <div className="fixed inset-0 min-h-screen">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="bg"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[90%] md:w-8/12 lg:w-4/12 xl:w-3/12 absolute p-8 md:p-12 bg-black mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 shadow-2xl"
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
          className="p-4 my-6 bg-red-700 w-full rounded-lg font-bold cursor-pointer"
          onClick={handleButtonClick}
        >
          {issignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 cursor-pointer"
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