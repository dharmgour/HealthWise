import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ Make sure extension is .jsx

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ AuthProvider wraps the whole App (including Navbar) */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
