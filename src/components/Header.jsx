import React from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants';
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
      // Sign-out successful.
    }).catch(() => {
      navigate("/error");
      // An error happened.
    }); 
  }

  return (
    <div className= "absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className= "w-44" src={LOGO} alt="" />
      {user && (
        <div className="flex p-2">
          <img className= "w-12 h-12 " src={user?.photoURL || USER_AVATAR} alt="" />
          <button onClick = {handleSignOut} className='font-bold text-white'> Sign Out </button>
        </div>
      )}
    
    </div>



  )
}   

export default Header;