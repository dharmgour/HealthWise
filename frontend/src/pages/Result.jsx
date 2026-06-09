import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  X,
  Send,
  ClipboardList,
} from "lucide-react";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const uploadData = location.state?.uploadData;

  // Chat states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋, I'm HealthWise AI. Ask anything about this report.",
    },
  ]);
  const [previousReports, setPreviousReports] = useState([]);

useEffect(() => {
  const fetchReports = async () => {
    const email = localStorage.getItem("user_email");
    if (!email) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/upload/user/${email}`);
      const data = await res.json();

      console.log("Previous Reports:", data);
      setPreviousReports(data);
    } catch (error) {
      console.error("Failed to fetch previous reports", error);
    }
  };

  fetchReports();
}, []);

  const [input, setInput] = useState("");

  const messagesRef = useRef(null);

  // Draggable chatbot bubble
  const [pos, setPos] = useState({ x: 20, y: window.innerHeight / 2 });
  const bubbleRef = useRef(null);

  const handleDrag = (e) => {
    const newX = e.clientX - bubbleRef.current.offsetWidth / 2;
    const newY = e.clientY - bubbleRef.current.offsetHeight / 2;

    setPos({
      x: Math.max(10, Math.min(window.innerWidth - 60, newX)),
      y: Math.max(10, Math.min(window.innerHeight - 60, newY)),
    });
  };

  const startDrag = () => {
    window.addEventListener("mousemove", handleDrag);
  };

  const stopDrag = () => {
    window.removeEventListener("mousemove", handleDrag);
  };

  // Auto-scroll chat
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  if (!uploadData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <h2 className="text-2xl text-slate-700 mb-4">No upload data found</h2>
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow"
        >
          Go to Upload
        </button>
      </div>
    );
  }

 const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  // Add user message to chat
  const userMsg = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);

  try {
    // Call backend Gemini Chat-Summary API
    const res = await fetch("http://127.0.0.1:5000/gemini/chat-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,               // user question
        summary: uploadData.summary,  // report summary from backend
      }),
    });

    const data = await res.json();

    // Bot reply
    const botMsg = {
      sender: "bot",
      text: data.reply || "⚠️ Unable to get response. Try again.",
    };

    setMessages((prev) => [...prev, botMsg]);

  } catch (err) {
    console.error("Chatbot Error:", err);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ Server error. Please try again later.",
      },
    ]);
  }

  setInput("");
};

  const severityBadge = (sev) => {
    if (sev === "high") return "bg-red-100 text-red-700";
    if (sev === "moderate") return "bg-yellow-100 text-yellow-700";
    if (sev === "low") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN */}
        <aside className="lg:col-span-4 space-y-6">

          {/* Report Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-md">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Report Uploaded
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {uploadData.patient_info?.name || "Unknown Patient"}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="rounded-lg overflow-hidden border border-slate-100">
                <img
                  src={uploadData.file_url}
                  alt="Report preview"
                  className="w-full h-56 object-contain bg-white"
                />
              </div>

              {/* MOBILE SAFE BUTTONS */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => window.open(uploadData.file_url, "_blank")}
                  className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md shadow text-sm"
                >
                  View Original
                </button>

                <button
                  onClick={() => navigate("/upload")}
                  className="w-full sm:w-auto bg-slate-100 border text-slate-700 px-4 py-2 rounded-md text-sm"
                >
                  Upload Another
                </button>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h4 className="text-sm text-slate-500 mb-2">Patient Details</h4>
            <div className="space-y-1 text-sm text-slate-700">
              <p><strong>Name:</strong> {uploadData.patient_info?.name || "—"}</p>
              <p><strong>Age / Gender:</strong> {uploadData.patient_info?.age} / {uploadData.patient_info?.gender}</p>
              <p><strong>Date:</strong> {uploadData.patient_info?.date || "—"}</p>
            </div>
            {/* Diet Plan Button */}
<button
  onClick={() =>
    navigate("/diet", { state: { summary: uploadData.summary } })
  }
  className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
>
  Get Diet Plan
</button>

          </div>

        </aside>

        {/* RIGHT COLUMN */}
        <main className="lg:col-span-8 space-y-6">

          {/* Summary Header */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-slate-800">Diagnostic Summary</h1>
            <p className="text-sm text-slate-500 mt-1">
              AI analyzed your medical report. Summary is below.
            </p>
          </div>

          {/* SUMMARY (STYLE B) */}
          <section className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex">
              <div className="w-2 bg-blue-600"></div>

              <div className="p-6 flex-1">
                <h2 className="text-xl font-semibold text-slate-800">Summary</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Highlighted insights and medical findings
                </p>

                <div className="mt-4 border-t pt-4">
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                    {uploadData.summary}
                  </p>

                  {/* SUB SECTIONS */}
                  <div className="mt-6 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Abnormal Values */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Abnormal Values</h4>
                      {uploadData.abnormal_values?.length ? (
                        <ul className="space-y-2 text-sm">
                          {uploadData.abnormal_values.map((val, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between bg-slate-50 rounded-md p-2"
                            >
                              <div>
                                <p className="font-medium text-slate-800">{val.name}</p>
                                <p className="text-xs text-slate-500">
                                  {val.value} • Normal: {val.normalRange}
                                </p>
                              </div>

                              <span
                                className={`px-2 py-1 rounded-md text-xs ${severityBadge(
                                  val.severity
                                )}`}
                              >
                                {val.severity.toUpperCase()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-500">None detected</p>
                      )}
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">
                        Recommendations
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
                        <li>Follow a healthy diet.</li>
                        <li>Get a physician check-up.</li>
                        <li>Re-test after medical consultation.</li>
                      </ul>
                    </div>

                    {/* Quick Stats */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Quick Snapshot</h4>
                      <p className="text-sm text-slate-700">
                        <strong>Cholesterol:</strong> {uploadData.quick_stats?.cholesterol || "—"}
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Glucose:</strong> {uploadData.quick_stats?.glucose || "—"}
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Kidney:</strong> {uploadData.quick_stats?.kidney || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PREVIOUS REPORTS */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Previous Reports
            </h3>

            <div className="space-y-3">
              {uploadData.previous_reports?.length ? (
                uploadData.previous_reports.map((rep, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-slate-50 border p-3 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-slate-800">{rep.name}</p>
                      <p className="text-xs text-slate-500">{rep.date}</p>
                    </div>

                    <button
                      onClick={() => window.open(rep.url, "_blank")}
                      className="bg-white border px-3 py-1 rounded-md text-sm"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No previous reports.</p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* DRAGGABLE FLOATING CHAT BUBBLE */}
     <button
  onClick={() => setChatOpen(true)}
  className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition"
>
  <MessageCircle className="w-6 h-6" />
</button>

      {/* CHAT PANEL */}
      {/* Slide-in Chat Panel (Right Side) */}
<div
  className={`fixed bottom-6 right-6 w-[340px] h-[480px] bg-white border border-slate-300 rounded-xl shadow-2xl z-50 transition-all duration-300 ${
    chatOpen ? "translate-x-0 opacity-100" : "translate-x-[420px] opacity-0"
  }`}
>
  {/* Header */}
  <div className="flex items-center justify-between p-4 border-b">
    <h3 className="font-semibold text-slate-800">AI Chat Assistant</h3>
    <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-slate-100 rounded">
      <X className="w-5 h-5 text-slate-600" />
    </button>
  </div>

  {/* Messages */}
  <div
    ref={messagesRef}
    className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50"
    style={{ height: "360px" }}
  >
    {messages.map((msg, idx) => (
      <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div
          className={`p-3 rounded-lg max-w-[80%] text-sm ${
            msg.sender === "user"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-800 border border-slate-200"
          }`}
        >
          {msg.text}
        </div>
      </div>
    ))}
  </div>

  {/* Input Box */}
  <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t bg-white">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message..."
      className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <button className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700">
      <Send className="w-5 h-5" />
    </button>
  </form>
</div>

     
    </section>
  );
}
