import React from "react";
import { HeartPulse, Brain, ShieldCheck, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          At <span className="font-semibold text-blue-600">HealthWise AI</span>,
          we’re transforming how people interact with their health through
          intelligent insights, smart tracking, and trusted recommendations.
          We believe in empowering individuals to take control of their
          well-being with the help of technology.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
          Our mission is to build a healthier world by integrating advanced AI
          with personalized healthcare solutions. We aim to make health
          monitoring, disease prevention, and data-driven recommendations
          accessible to everyone — anytime, anywhere.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <HeartPulse className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Health First</h3>
          <p className="text-gray-600 text-sm">
            Every feature we build starts with one question — “Will this improve
            someone’s health?”
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Innovation</h3>
          <p className="text-gray-600 text-sm">
            We harness the power of artificial intelligence to deliver smart,
            accurate, and personalized insights.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Trust & Security</h3>
          <p className="text-gray-600 text-sm">
            Your health data is safe with us — we ensure the highest standards of
            security and privacy.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
          <p className="text-gray-600 text-sm">
            We’re more than a platform — we’re a growing community of people who
            care about health and technology.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Our Vision</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We envision a future where every person has access to intelligent,
          proactive health insights that empower them to live longer, healthier,
          and happier lives. Through constant innovation, collaboration, and
          compassion, HealthWise AI strives to become the most trusted AI-powered
          health companion worldwide.
        </p>
      </section>
    </div>
  );
}
