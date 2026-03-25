import React from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants';
import {useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
    
      // Sign-out successful.
    }).catch(() => {
      navigate("/error");
      // An error happened.
    }); 
  };
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        // User is signed in
        const {uid, email, displayName,photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));

        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      
      }
    });
    // Unsubscribe when my component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate])


const handleGptSearchClick = () => {
  // Toggle GPT Search Button 
  dispatch(toggleGptSearchView());

};




  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleLogoClick = () => {
    if (showGptSearch) {
      dispatch(toggleGptSearchView());
    }
    if (user) {
      navigate('/browse');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="absolute w-screen px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center sm:bg-black md:bg-transparent">
      <img
        className="w-32 md:w-44 mx-auto md:mx-0 cursor-pointer"
        src={LOGO}
        alt="logo"
        onClick={handleLogoClick}
      />

      {user && (
        <div className="flex p-2 items-center justify-between mt-2 md:mt-0 w-full md:w-auto overflow-x-auto">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 border border-gray-700 text-white rounded-md shadow-sm outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          )}
          <button onClick={handleGptSearchClick} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 mx-4 my-2 rounded-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95'>
            GPT Search
          </button>
          <img className="hidden md:block w-10 h-10 rounded-md mx-2 shrink-0" src={user?.photoURL || USER_AVATAR} alt="user avatar" />
          <button onClick={handleSignOut} className='font-bold text-white hover:text-red-500 transition-colors mx-2 whitespace-nowrap'> Sign Out </button>
        </div>
      )}
    
    </div>  



  )
}   

export default Header;