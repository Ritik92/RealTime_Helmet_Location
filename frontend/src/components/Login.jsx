import React from 'react'
import Template from './Template'
import loginImg from '../assets/login.jpg'

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Join now and avail 20% early bird discounts"
      desc2="mindSHIELD helmet - more than a bucket"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login