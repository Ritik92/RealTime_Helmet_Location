import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios" 
import toast from "react-hot-toast"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" })
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    setLoading(true)
    setSubmitStatus({ success: false, message: "" })
    
    try {
      const response = await axios.post('http://localhost:4000/api/v1/contact/contact', {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        message: data.message,
        phoneNo: data.phoneNo
      })

      if (response.data.success) {
        setSubmitStatus({ 
          success: true, 
          message: "Thank you for your message. We'll get back to you soon!" 
        })
        toast.success("Query Sent Successfully")
      } else {
        throw new Error(response.data.message || "Something went wrong")
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || "Failed to send message. Please try again." 
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful && submitStatus.success) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "+91"
      })
    }
  }, [reset, isSubmitSuccessful, submitStatus.success])

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" }
  ]

  return (
    <div className="w-full max-w-[600px] mx-auto">
      {submitStatus.message && (
        <div className={`p-4 mb-6 rounded-md ${
          submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form
        className="flex flex-col gap-7"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname" className="text-sm font-semibold text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="w-full rounded-md border border-gray-400 bg-gray-800 p-2 text-white"
              {...register("firstname", { 
                required: "First name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              })}
            />
            {errors.firstname && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.firstname.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="text-sm font-semibold text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="w-full rounded-md border border-gray-400 bg-gray-800 p-2 text-white"
              {...register("lastname")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="w-full rounded-md border border-gray-400 bg-gray-800 p-2 text-white"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="text-sm font-semibold text-gray-300">
            Phone Number
          </label>

          <div className="flex gap-5">
            <div className="flex w-[81px] flex-col gap-2">
              <select
                name="countrycode"
                id="countrycode"
                className="w-full rounded-md border border-gray-400 bg-gray-800 p-2 text-white"
                {...register("countrycode", { required: true })}
              >
                {countryCodes.map((ele, i) => (
                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="tel"
                name="phoneNo"
                id="phoneNo"
                placeholder="12345 67890"
                className="w-full rounded-md border border-gray-400 bg-gray-800 p-2 text-white"
                {...register("phoneNo", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,12}$/,
                    message: "Please enter a valid phone number"
                  }
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-gray-300">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="w-full rounded-md border border-gray-400 bg-gray-800 p-2 text-white"
            {...register("message", { 
              required: "Message is required",
              minLength: { value: 10, message: "Message must be at least 10 characters" }
            })}
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-400 px-6 py-3 text-center font-bold text-black shadow-md transition-all duration-200 
            ${!loading && "hover:scale-95 hover:shadow-sm"} 
            disabled:bg-gray-600 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactUsForm