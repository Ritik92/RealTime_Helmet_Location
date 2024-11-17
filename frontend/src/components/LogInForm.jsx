import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from './AuthContext';
const LogInForm = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const {login}=useAuth()
    const [formData, setFormData] = useState({
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(event){
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name] : event.target.value
            }
        ))
    }

    async function submitHandler(event) {
        event.preventDefault();
        
        try{
            
            const response = await login(formData.email,formData.password)
            if(response.success){
               
                setIsLoggedIn(true);
                toast.success("Logged In");
                navigate("/dashboard");
            }
            else toast.error("Invalid Credentials")
        }
        catch(e){
            toast.error("Invalid Credentials")
        }
       
        
    }


  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6 justify-center'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                Email Address <sup className='text-pink-600'>*</sup>
            </p>

            <input
                required
                type='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter your email id'
                name='email'
                className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                Password <sup className='text-pink-600'>*</sup>
            </p>

            <input
                required
                type={showPassword ? ("text") : ("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter your password'
                name='password'
                className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'className='-mt-1'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF' className='-mt-1'/>)}
            </span>

            <Link to="/forgotpassword">
                <p className='text-xs mt-1 text-blue-500 ml-auto max-w-max'>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button className='bg-yellow-400 rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-5'>
            Sign In
        </button>
    </form>
  )
}

export default LogInForm