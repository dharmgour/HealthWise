import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import {
  FileText,
  Apple,
  MessageCircle,
  Brain,
  Users,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // ✅ from AuthContext

  const handleUploadClick = () => {
    if (isLoggedIn) {
      navigate("/upload"); // ✅ logged in → go to upload page
    } else {
      navigate("/login"); // ❌ not logged in → go to login
    }
  };

  return (
    <div className="w-full text-slate-900 bg-gray-50">
      {/* HERO */}
      <section
        className="relative w-full min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.45), rgba(2,6,23,0.45)), url('/src/assets/hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-12 py-24">
          {/* left content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Turn Medical Reports into Clear Health Action
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-100 max-w-3xl mx-auto lg:mx-0">
              HealthWise AI analyzes your medical reports, simplifies complex terms, and delivers personalized diet and wellness recommendations — all in a few clicks.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 border-2 border-white rounded-full font-semibold hover:bg-blue-50 hover:border-blue-600 transition-all duration-200"
              >
                Get Started
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 border-2 border-white rounded-full font-semibold hover:bg-blue-50 hover:border-blue-600 transition-all duration-200"
              >
                Learn More
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Trusted by 50K+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <span>Real-time results</span>
              </div>
            </div>
          </div>

          {/* right image card */}
          <div className="flex-1 max-w-xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-800">Sample Report Summary</h3>
              <p className="text-sm text-slate-600 mt-2">
                Upload a test report and see how HealthWise AI highlights important values, suggests actions, and generates a diet plan.
              </p>

              <div className="mt-4 border border-slate-100 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 flex justify-between text-xs text-slate-500">
                  <span>Parameter</span>
                  <span>Result</span>
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Blood Sugar</div>
                    <div className="text-xs text-slate-500">Fasting</div>
                  </div>
                  <div className="text-sm text-red-600 font-semibold">160 mg/dL</div>
                </div>
                <div className="px-4 py-3 flex justify-between items-center bg-white">
                  <div>
                    <div className="text-sm font-medium">Cholesterol</div>
                    <div className="text-xs text-slate-500">Total</div>
                  </div>
                  <div className="text-sm text-amber-600 font-semibold">230 mg/dL</div>
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Vitamin D</div>
                    <div className="text-xs text-slate-500">25-OH</div>
                  </div>
                  <div className="text-sm text-green-600 font-semibold">35 ng/mL</div>
                </div>
              </div>

           <button
  onClick={handleUploadClick}
  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
>
  Upload Your Report
</button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 text-center">
            Why HealthWise AI?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 text-center max-w-2xl mx-auto">
            Powerful features to help you understand and act on your health data.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800">Report Simplification</h3>
              <p className="mt-2 text-sm text-slate-600">Reads and explains lab values in simple words.</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4">
                <Apple className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800">Personal Diet Plans</h3>
              <p className="mt-2 text-sm text-slate-600">Custom meal plans based on your health and preferences.</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800">AI Chatbot</h3>
              <p className="mt-2 text-sm text-slate-600">Ask health questions and get reliable answers instantly.</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800">AI Insights</h3>
              <p className="mt-2 text-sm text-slate-600">Deep analytics to track your health trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WEBSITE INFORMATION */}
      <section id="info" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
            About HealthWise AI
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            HealthWise AI is an intelligent web platform built to simplify complex medical data. 
            Our mission is to empower every individual to take informed decisions about their health. 
            By analyzing your uploaded medical reports, our system highlights critical health parameters, 
            interprets them in plain language, and provides instant recommendations for diet, lifestyle, and care.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-slate-800 text-lg mb-2">Our Vision</h3>
              <p className="text-sm text-slate-600">
                To make healthcare understanding accessible for everyone through AI-powered insights 
                and user-friendly technology.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-slate-800 text-lg mb-2">Our Technology</h3>
              <p className="text-sm text-slate-600">
                Built using advanced machine learning and NLP models that interpret test results 
                and suggest actionable health plans.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-slate-800 text-lg mb-2">Our Promise</h3>
              <p className="text-sm text-slate-600">
                Your data remains secure and confidential. We never share or store sensitive 
                medical information without consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Ready to take control of your health?
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Sign up and start your health jouney.
          </p>
          <div className="mt-6">
            <a
              className="inline-block px-8 py-3 bg-white text-blue-700 rounded-full font-semibold"
              href="#signup"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
