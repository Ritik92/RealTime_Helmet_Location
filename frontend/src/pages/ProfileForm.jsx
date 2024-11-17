import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import profileImg from '../assets/dummy-profile-pic.jpg'; // Import default profile image

const ProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Pranay",
    lastName: "Gupta",
    email: "pranay@thecodehelp.in",
    address: "123, Street Name, City, Country",
  });

  const [image, setImage] = useState(profileImg); // Set default image

  function changeHandler(event) {
    setFormData((prevData) => (
      {
        ...prevData,
        [event.target.name]: event.target.value
      }
    ));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    const accountData = {
      ...formData,
      image
    };

    const finalData = {
      ...accountData,
    };

  
    toast.success("Profile updated");
    navigate("/profile");
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-slate-800 rounded-lg shadow-md'>
      <form onSubmit={submitHandler} className='space-y-6'>
     {/* Image upload */}
     <label className='w-full'>
          <p className='text-sm text-white mb-1'>
            Profile Pic <sup className='text-pink-600'>*</sup>
          </p>
          <div className='text-center'>
            <img
              src={image}
              alt="Profile"
              className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
            />
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='block mx-auto mb-4'
            />
          </div>
        </label>
        {/* First and last name */}
        <div className='flex gap-x-4'>
          <label className='flex-1'>
            <p className='text-sm text-white mb-1'>
              First Name <sup className='text-pink-600'>*</sup>
            </p>
            <input
              required
              type='text'
              name='firstName'
              onChange={changeHandler}
              placeholder='Enter First Name'
              value={formData.firstName}
              className='rounded-md p-2 bg-slate-700 w-full text-white'
            />
          </label>

          <label className='flex-1'>
            <p className='text-sm text-white mb-1'>
              Last Name <sup className='text-pink-600'>*</sup>
            </p>
            <input
              required
              type='text'
              name='lastName'
              onChange={changeHandler}
              placeholder='Enter Last Name'
              value={formData.lastName}
              className='rounded-md p-2 bg-slate-700 w-full text-white'
            />
          </label>
        </div>

        {/* Email */}
        <label className='w-full'>
          <p className='text-sm text-white mb-1'>
            Email <sup className='text-pink-600'>*</sup>
          </p>
          <input
            required
            type='email'
            name='email'
            onChange={changeHandler}
            placeholder='Enter Email'
            value={formData.email}
            className='rounded-md p-2 bg-slate-700 w-full text-white'
          />
        </label>

      

   

        <button className='bg-yellow-500 rounded-md font-medium text-black px-4 py-2 mt-4 w-full'>
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
