import React, { useState } from "react";
import { Upload as UploadIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("user_email");

    if (!userEmail) {
      alert("⚠ User email missing. Please log in again.");
      return;
    }

    if (!file) {
      alert("⚠ Please select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_email", userEmail);

    try {
      // STEP 1: Upload file to backend (Cloudinary)
      const response = await fetch("http://127.0.0.1:5000/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload API Response:", data);

      if (!response.ok) {
        alert(`Upload failed: ${data.error}`);
        return;
      }

      alert("✅ File uploaded successfully!");

      // -----------------------------
      // ⭐ STEP 2: ANALYZE WITH GEMINI
      // -----------------------------
      const analyzeResponse = await fetch(
        "http://127.0.0.1:5000/gemini/analyze-report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: data.file_url, // cloudinary URL sent to gemini
          }),
        }
      );

      const analyzeData = await analyzeResponse.json();
      console.log("Gemini Summary:", analyzeData);

      if (!analyzeResponse.ok) {
        alert("❌ Gemini analysis failed.");
        return;
      }

      // -----------------------------
      // ⭐ STEP 3: Navigate to Result Page with Summary
      // -----------------------------
      navigate("/result", {
        state: {
          uploadData: {
            ...data, // includes file_url, format, etc.
            summary: analyzeData.summary, // important
          },
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Network Error — Check your Flask server.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Upload Your Medical Report
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Upload your medical report to get AI-powered insights. Supported formats include PDF and images.
        </p>
      </div>

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 text-center border border-slate-200">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <UploadIcon className="w-10 h-10 text-blue-600" />
          </div>

          <label className="w-full cursor-pointer">
            <input type="file" onChange={handleFileChange} className="hidden" />
            <div className="border-2 border-dashed border-blue-400 rounded-lg py-6 px-4 hover:bg-blue-50 transition-all duration-200">
              {file ? (
                <p className="text-blue-700 font-medium flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> {file.name}
                </p>
              ) : (
                <p className="text-slate-500 text-sm md:text-base">
                  Click or drag file here to upload
                </p>
              )}
            </div>
          </label>

          <button
            onClick={handleUpload}
            className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-10 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Upload & Analyze Report
          </button>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-500 text-center mt-6 max-w-md">
        Your data is processed securely and never shared with third parties.
      </p>
    </section>
  );
}
