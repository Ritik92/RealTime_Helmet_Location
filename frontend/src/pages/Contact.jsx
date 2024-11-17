import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contactDetails = [
    {
      icon: Mail,
      heading: "Email Support",
      description: "24/7 Emergency Support Available",
      details: "support@mindshield.com",
      action: "Email us",
    },
    {
      icon: MapPin,
      heading: "Visit Our Lab",
      description: "See MindShield in Action",
      details: "TIET PATIALA, PUNJAB, INDIA",
      action: "Get directions",
    },
    {
      icon: Phone,
      heading: "Call Us",
      description: "24/7 Emergency Hotline",
      details: "(+91) 7206016422",
      action: "Call now",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const submitContactForm = async (data) => {
    setLoading(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/contact/contact",
        {
          email: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          message: data.message,
          phoneNo: data.phoneNo,
        }
      );

      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you for your message. We'll get back to you soon!",
        });
        toast.success("Query Sent Successfully");
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus({
        success: false,
        message:
          error.response?.data?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/30 py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contact <span className="text-yellow-400">MindShield</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg max-w-2xl"
          >
            Your safety is our priority. Whether you need technical support, want to learn
            more about our smart helmet technology, or are interested in partnerships,
            we're here to help.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 hover:bg-gray-800/70 transition-all group"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-yellow-400/10 rounded-lg"
                >
                  <item.icon className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{item.description}</p>
                  <p className="text-white font-medium mb-4">{item.details}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center text-yellow-400 text-sm font-medium group-hover:gap-2 transition-all"
                  >
                    {item.action}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-8 lg:p-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Let's Collaborate
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 mb-8"
            >
              Share your thoughts about our smart helmet's real-time collision detection,
              emergency response, and live location tracking features.
            </motion.p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onSubmit={handleSubmit(submitContactForm)}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    {...register("firstname", { required: "First name is required" })}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                  {errors.firstname && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstname.message}
                    </p>
                  )}
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    {...register("lastname")}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="grid grid-cols-4 gap-4">
                  <select
                    {...register("countrycode")}
                    className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <div className="col-span-3">
                    <input
                      {...register("phoneNo", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
                {errors.phoneNo && (
                  <p className="mt-1 text-sm text-red-400">{errors.phoneNo.message}</p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  rows={6}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your interest in MindShield..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-lg ${
                  submitStatus.success
                    ? "bg-green-400/10 text-green-400"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;