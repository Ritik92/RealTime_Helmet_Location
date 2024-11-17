import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-yellow-500">
        Interested in Our Smart Helmet? Let's Collaborate!
      </h1>
      <p className="text-gray-400 leading-7 mt-2">
        Share your thoughts or inquiries about our smart helmet's real-time collision detection, emergency response, and live location tracking.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;