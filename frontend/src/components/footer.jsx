import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-blue-800">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#about" className="hover:text-blue-300 transition">About Us</a></li>
              <li><a href="#careers" className="hover:text-blue-300 transition">Careers</a></li>
              <li><a href="#partners" className="hover:text-blue-300 transition">Partners</a></li>
              <li><a href="#contact" className="hover:text-blue-300 transition">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#features" className="hover:text-blue-300 transition">Features</a></li>
              <li><a href="#plans" className="hover:text-blue-300 transition">Plans & Pricing</a></li>
              <li><a href="#faq" className="hover:text-blue-300 transition">FAQ</a></li>
              <li><a href="#blog" className="hover:text-blue-300 transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#help" className="hover:text-blue-300 transition">Help Center</a></li>
              <li><a href="#terms" className="hover:text-blue-300 transition">Terms & Conditions</a></li>
              <li><a href="#privacy" className="hover:text-blue-300 transition">Privacy Policy</a></li>
              <li><a href="#feedback" className="hover:text-blue-300 transition">Feedback</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-blue-100 mb-4">
              Subscribe to get the latest health tips and product updates.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-slate-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md font-semibold transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-blue-200">
          {/* Left: Logo and copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                HW
              </div>
              <span className="font-semibold text-white">HealthWise AI</span>
            </div>
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} HealthWise AI. All rights reserved.
            </p>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:support@healthwise.ai" className="hover:text-blue-400 transition">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
