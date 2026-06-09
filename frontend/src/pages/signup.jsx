import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Signup successful! Please login now.");
        navigate("/login");
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Network error, please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
      {/* Left Side - Image */}
       <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-200 p-10">
        <img
          src="https://png.pngtree.com/png-vector/20240401/ourmid/pngtree-digital-prescriptions-for-a-modern-healthcare-approach-png-image_12256213.png"
          alt="Medical Login Illustration"
          className="w-[780px] h-[650px] object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Create Your Account 🩺
          </h2>
          <p className="text-center text-slate-600 mb-6">
            Join HealthWise AI for smarter report insights.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all duration-200"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-slate-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
