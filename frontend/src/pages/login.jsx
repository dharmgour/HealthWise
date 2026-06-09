import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_email", data.user_email);
        localStorage.setItem("user_name", data.user_name);
        login({ name: data.user_name, email: data.user_email });
        alert("✅ Login successful!");
        navigate("/upload");
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error — check backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      
      {/* Left Side - Medical Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-200 p-10">
        <img
          src="https://png.pngtree.com/png-clipart/20240314/original/pngtree-doctor-giving-advice-to-patient-3d-character-illustration-png-image_14588081.png"
          alt="Medical Login Illustration"
          className="w-[780px] h-[650px] object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-center text-slate-600 mb-6">
            Login to access your HealthWise AI dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-slate-600 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
