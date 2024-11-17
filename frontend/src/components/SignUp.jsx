import React from 'react'
import Template from './Template'
import signUpImg from '../assets/signup.jpg'

const SignUp = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Enjoy your ride safely with mindSHIELD"
      desc1="Join now and avail 20% early bird discounts"
      desc2="mindSHIELD helmet - more than a bucket"
      image={signUpImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default SignUp