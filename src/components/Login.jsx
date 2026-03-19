import React from 'react';
import { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';



const Login = () => {
  const [issignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  
  const name= useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignForm = () => {
    setIsSignInForm(!issignInForm);
  };
 








  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    // Sign In / Sign Up
  
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d825497c-4678-4f25-90da-6637ec2cf892/web/IN-en-20260316-TRIFECTA-perspective_b65994ee-c5aa-4a5e-99ff-d137eebb94ef_medium.jpg" alt="logo" />
      </div>
      <form
       onSubmit={(e) => e.preventDefault()}
       className="w-full md:w-4/12 lg:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70">
        <h1 className='font-bold text-3xl py-4'>{issignInForm ? "Sign In" : "Sign Up"}</h1>
        {!issignInForm && (
          <input ref={name}
            type="text" 
            placeholder='Full Name' 
            className="p-4 my-4 w-full bg-gray-700 rounded-lg" />
        )}
        
        <input ref={email} type="text" placeholder='Email Address' className="p-4 my-4 w-full bg-gray-700 rounded-lg" />
        
        
        
        <input ref={password} type="password" placeholder='Password' className="p-4 my-4 w-full bg-gray-700 rounded-lg" />
        
        <p className = "text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        
        
        
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg font-bold cursor-pointer " onClick={handleButtonClick}> {issignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignForm}> {issignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"} </p>
          {/* <span className="text-gray-400">New to Netflix?</span>
          {' '}
          <span className="font-bold hover:underline cursor-pointer">Sign up now.</span> */}
        
      </form>
    </div>
  ); 
};

export default Login;