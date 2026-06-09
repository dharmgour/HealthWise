import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Have any questions, feedback, or collaboration ideas?  
          We'd love to hear from you! Reach out to us and our team will get back
          to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info Section */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
              <p className="text-gray-600">
                HealthWise AI HQ, Indore, Madhya Pradesh, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@healthwiseai.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="yourname@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                placeholder="Write your message here..."
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             text-gray-800 placeholder-gray-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition-all duration-200"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-20 text-gray-600 text-sm">
        <p>
          We usually respond within <span className="font-semibold text-blue-600">24 hours</span>.
          Your satisfaction is our top priority.
        </p>
      </div>
    </div>
  );
}
