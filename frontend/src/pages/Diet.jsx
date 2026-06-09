import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Salad, Loader2 } from "lucide-react";

export default function Diet() {
  const navigate = useNavigate();
  const location = useLocation();
  const summary = location.state?.summary;

  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDiet = async () => {
    if (!summary) {
      alert("⚠ No medical summary provided");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/gemini/diet-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert("❌ Diet plan failed: " + (err.error || "Unknown error"));
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.diet_plan) {
        setDietPlan(data.diet_plan);
      } else {
        alert("❌ Diet plan generation failed.");
      }
    } catch (error) {
      console.error("Diet Error:", error);
      alert("❌ Server error — Could not generate diet plan.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-700 mb-6 hover:text-slate-900"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Report
      </button>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-200">

        <div className="flex items-center gap-3 mb-5">
          <Salad className="w-10 h-10 text-green-600" />
          <h1 className="text-3xl font-bold text-slate-800">
            Personalized Diet Plan
          </h1>
        </div>

        <p className="text-slate-600 mb-6 text-lg">
          AI-powered diet suggestions based on your medical report summary.
        </p>

        {/* BUTTON TO GENERATE */}
        {!dietPlan && (
          <button
            onClick={generateDiet}
            disabled={loading}
            className="bg-green-600 flex items-center gap-2 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Generating…
              </>
            ) : (
              "Generate Diet Plan"
            )}
          </button>
        )}

        {/* RESULT */}
        {dietPlan && (
          <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-xl text-slate-800 whitespace-pre-line leading-relaxed shadow">
            {dietPlan}
          </div>
        )}
      </div>
    </section>
  );
}
