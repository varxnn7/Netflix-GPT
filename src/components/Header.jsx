import React, { useState, useEffect } from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="absolute w-screen px-4 md:px-8 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between items-center sm:bg-black md:bg-transparent">
      <img
        className="w-32 md:w-44 mx-auto md:mx-0 cursor-pointer"
        src={LOGO}
        alt="logo"
        onClick={handleLogoClick}
      />

      {user && (
        <div className="flex p-2 items-center justify-between mt-2 md:mt-0 w-full md:w-auto overflow-visible">
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
          {/* Profile Dropdown */}
          <div className="relative ml-4 hidden md:block">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                className={`w-8 h-8 rounded-md shrink-0 border transition-colors ${isDropdownOpen ? 'border-white' : 'border-transparent hover:border-white'}`} 
                src={user?.photoURL || USER_AVATAR} 
                alt="user avatar" 
              />
              <svg 
                className={`w-4 h-4 text-white transition-transform duration-300 transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Dropdown Menu */}
            <div className={`absolute right-0 top-12 w-56 bg-black bg-opacity-95 border border-gray-800 rounded-sm shadow-2xl transition-all duration-300 z-50 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="absolute -top-2 right-4 w-4 h-4 bg-black border-l border-t border-gray-800 transform rotate-45"></div>
              
              <div className="py-2">
                {/* Profiles */}
                <div className="flex flex-col mb-2 text-gray-300">
                  <div className="flex items-center px-4 py-2 hover:underline text-white cursor-pointer group/item">
                    <img className="w-7 h-7 rounded-sm mr-3 bg-blue-500" src={user?.photoURL || USER_AVATAR} alt="user profile" onError={(e) => {e.target.src=USER_AVATAR}}/>
                    <span className="text-[13px] font-medium">{user.displayName || user.email.split('@')[0]}</span>
                  </div>
                </div>

                <div className="flex flex-col text-[13px] text-gray-300 font-semibold border-t border-gray-700 pt-3 pb-2">
                  <div className="flex items-center px-4 py-2 hover:underline cursor-pointer group/action">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-gray-400 group-hover/action:text-white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                    Manage Profiles
                  </div>
                  <div className="flex items-center px-4 py-2 hover:underline cursor-pointer group/action">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-gray-400 group-hover/action:text-white"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                    Transfer Profile
                  </div>
                  <div className="flex items-center px-4 py-2 hover:underline cursor-pointer group/action">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-gray-400 group-hover/action:text-white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    Account
                  </div>
                  <div className="flex items-center px-4 py-2 hover:underline cursor-pointer group/action">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-gray-400 group-hover/action:text-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                    Help Centre
                  </div>
                </div>

                <div className="border-t border-gray-700 mt-1 flex justify-center py-4">
                  <button onClick={handleSignOut} className='text-[13px] font-bold text-white hover:underline whitespace-nowrap'> 
                    Sign out of Netflix 
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Sign Out (Fallback) */}
          <button onClick={handleSignOut} className='md:hidden font-bold text-white hover:text-red-500 transition-colors mx-2 whitespace-nowrap mt-2 md:mt-0'> 
            Sign Out 
          </button>
        </div>
      )}
    
    </div>  



  )
}   

export default Header;