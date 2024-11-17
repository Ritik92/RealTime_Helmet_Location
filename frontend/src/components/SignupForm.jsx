import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp:""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const[showEnterOtp,setShowEnterOtp]=useState(false)
    async function handleotp(){
        
        try{
            if(formData.email){
                const response = await axios.post(
                    'http://localhost:4000/api/v1/auth/sendotp',
                    {
                        email: formData.email
                    }
                );
                if(response){
                    setShowEnterOtp(true)
                    toast.success("Otp Sent Successfully");
                  
                }
            }
            else toast.error("Please Enter  Email first")
           
        }
        catch(e){
            toast.error("Error Occured , Try after few minutes!")
        }
    }
    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

   async function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try{
            const result = await register(formData.email, formData.password,formData.firstName,formData.lastName,formData.otp,formData.confirmPassword); 
            console.log(result)
            if(result.success){
                toast.success("Account Created");
                navigate("/login");
            }
            else toast.error("Some Error Occurred")
        }
        catch(e){
            console.log(e)
            toast.error("Error Occured , Try after few minutes!")
        }
        
    }

    return (
        <div>
           

            <form onSubmit={submitHandler}>
                {/* first and last name */}
                <div className='flex gap-x-4 mt-8'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                            First Name <sup className='text-pink-600'>*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='firstName'
                            onChange={changeHandler}
                            placeholder='Enter First Name'
                            value={formData.firstName}
                            className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-white leading-[1.375rem] mt-2'>
                            Last Name <sup className='text-pink-600'>*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='lastName'
                            onChange={changeHandler}
                            placeholder='Enter Last Name'
                            value={formData.lastName}
                            className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
                        />
                    </label>
                </div>

                {/* email */}
                <label className='w-full'>
                    <p className='text-[0.875rem] text-white leading-[1.375rem] mt-2'>
                        Email <sup className='text-pink-600'>*</sup>
                    </p>
                    <div className='flex'>
                    <input
                        required
                        type='email'
                        name='email'
                        onChange={changeHandler}
                        placeholder='Enter Email'
                        value={formData.email}
                        className='rounded-l-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
                    />
                        <div onClick={handleotp} onChange={changeHandler} className='ml-6 rounded-[0.5rem] p-[6px] bg-slate-900 w-1/6  text-white hover:cursor-pointer'>
                            Send Otp 
                        </div>
                    </div>
                    
                    
                      
                    
                </label>

                {/* {Otp Input Box} */}
                {showEnterOtp&& 
                <label className='w-full'>
                    <p className='text-[0.875rem] text-white leading-[1.375rem] '>
                        Otp <sup className='text-pink-600'>*</sup>
                    </p>
                    <input
                        required
                        type='otp'
                        name='otp'
                      
                        placeholder='Enter Otp'
                        onChange={changeHandler}
                        className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
                    />
                </label>}

                {/* password and its confirmation */}
                <div className='flex gap-x-4'>
                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-white mt-2 leading-[1.375rem]'>
                            Create Password <sup className='text-pink-600'>*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? ("text") : ("password")}
                            name='password'
                            onChange={changeHandler}
                            placeholder='Enter Password'
                            value={formData.password}
                            className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
                        />

                        <span
                            className='absolute right-3 top-[41px] cursor-pointer'
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' className='-mt-1' />) :
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' className='-mt-1' />)}
                        </span>
                    </label>

                    <label className='w-full relative mt-2'>
                        <p className='text-[0.875rem] text-white leading-[1.375rem]'>
                            Confirm Password <sup className='text-pink-600'>*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? ("text") : ("password")}
                            name='confirmPassword'
                            onChange={changeHandler}
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            className='rounded-[0.5rem] p-[6px] bg-slate-900 w-full text-white'
                        />

                        <span
                            className='absolute right-3 top-[33px] cursor-pointer'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {showConfirmPassword ?
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' className='-mt-1' />) :
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' className='-mt-1' />)}
                        </span>
                    </label>
                </div>

                <button className='bg-yellow-400 rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-5 w-full'>
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm