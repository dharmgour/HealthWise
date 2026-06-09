import React from "react";
import { HeartPulse, Brain, Users, Shield } from "lucide-react";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-800">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          About <span className="text-indigo-700">HealthWise AI</span>
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
          HealthWise AI is your trusted companion for understanding and managing your health data.
          Our mission is to make healthcare information more accessible, clear, and actionable — powered by the intelligence of AI.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16 px-6 shadow-inner">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1661665608581-23c8f4c34faf?ixlib=rb-4.1.0&auto=format&fit=crop&w=1170&q=80"
              alt="Health AI"
              className="rounded-2xl shadow-lg object-cover w-full h-80"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We aim to simplify complex medical data through intelligent AI systems.
              HealthWise AI helps individuals make informed health decisions by providing
              report summaries, early insights, and personalized recommendations.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe technology can bridge the gap between medical expertise and everyday understanding.
              That’s why we’re building a platform that empowers users with clarity and confidence in their health journey.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Our Core Values</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We are guided by principles that ensure our users’ trust, data security, and meaningful health engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
            <HeartPulse className="w-10 h-10 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Compassion</h3>
            <p className="text-slate-600 text-sm">
              We care deeply about every user's well-being and design with empathy and respect.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
            <Brain className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Innovation</h3>
            <p className="text-slate-600 text-sm">
              We constantly push the boundaries of AI to deliver smarter, faster, and more helpful results.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Transparency</h3>
            <p className="text-slate-600 text-sm">
              We believe in clear communication, honest practices, and open insights for our users.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
            <Shield className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Security</h3>
            <p className="text-slate-600 text-sm">
              Your data is fully encrypted and stored securely — your privacy is our top priority.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Our Vision
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              HealthWise AI envisions a world where individuals understand their health as clearly as professionals do.
              We strive to integrate AI with medical expertise to make proactive health management accessible to everyone.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By merging science, empathy, and technology, we hope to redefine how people connect with their health data — 
              turning confusion into clarity and information into empowerment.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://media.istockphoto.com/photos/doctor-with-stethoscope-in-hand-on-hospital-background-picture-id695337976?k=6&m=695337976&s=612x612&w=0&h=A2MhcOiq90oHp5zw31M8fmqDL7AHYPbgf3KXGymPUhw="
              alt="Our Vision"
              className="rounded-2xl shadow-lg object-cover w-full h-80"
            />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h2 className="text-3xl font-bold mb-4">Join the HealthWise Revolution</h2>
        <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
          Discover how AI can transform your healthcare experience — from understanding your reports to improving your lifestyle.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          Get Started Today
        </a>
      </div>
    </section>
  );
}
