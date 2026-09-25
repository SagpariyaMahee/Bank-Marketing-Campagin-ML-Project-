"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import ExecutiveDashboard from "./ExecutiveDashboard";
import FeatureForm from "./FeatureForm";
import PredictionResult from "./PredictionResult";
import ModelAnalytics from "./ModelAnalytics";
import DatasetExplorer from "./DatasetExplorer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

const INITIAL_DEFAULTS = {
  age: 35,
  job: "management",
  marital: "single",
  education: "tertiary",
  default: "no",
  balance: 1500,
  housing: "no",
  loan: "no",
  contact: "cellular",
  day: 15,
  month: "may",
  duration: 300,
  campaign: 1,
  pdays: -1,
  previous: 0,
  poutcome: "unknown",
};

// Client-side fallback prediction algorithm matching Python Logistic Regression logic
function calculateFallbackPrediction(features) {
  let score = -2.2;

  const duration = Number(features.duration) || 0;
  if (duration > 600) score += 2.2;
  else if (duration > 350) score += 1.4;
  else if (duration > 200) score += 0.7;
  else if (duration < 100) score -= 1.2;

  const poutcome = features.poutcome || "unknown";
  if (poutcome === "success") score += 2.5;
  else if (poutcome === "failure") score -= 0.4;

  const balance = Number(features.balance) || 0;
  if (balance > 5000) score += 0.8;
  else if (balance > 1500) score += 0.4;
  else if (balance < 0) score -= 0.6;

  if (features.housing === "yes") score -= 0.5;
  if (features.loan === "yes") score -= 0.6;

  const campaign = Number(features.campaign) || 1;
  if (campaign > 4) score -= 0.7;

  if (features.contact === "cellular") score += 0.4;
  else if (features.contact === "unknown") score -= 0.8;

  if (["student", "retired"].includes(features.job)) score += 0.6;
  if (features.education === "tertiary") score += 0.3;

  const prob_yes = 1 / (1 + Math.exp(-score));
  const prob_no = 1 - prob_yes;
  const prob_pct = Math.round(prob_yes * 1000) / 10;
  const pred = prob_yes >= 0.5 ? 1 : 0;

  const insights = [];
  if (duration >= 400) insights.push(`⏱️ Extended call duration (${duration}s) strongly increases client interest.`);
  else if (duration < 120) insights.push(`⏱️ Short call duration (${duration}s) limits engagement time with client.`);
  if (poutcome === "success") insights.push("🎉 Client's successful outcome in previous campaign is a top positive indicator.");
  else if (poutcome === "failure") insights.push("⚠️ Previous campaign failed, requiring strategic follow-up.");
  if (balance >= 3000) insights.push(`💰 Solid account balance (€${balance}) signals strong financial capacity.`);
  else if (balance < 0) insights.push(`🔻 Negative balance (€${balance}) lowers term deposit likelihood.`);
  if (features.housing === "no" && features.loan === "no") insights.push("✅ Absence of housing & personal loans frees up disposable income.");
  else if (features.housing === "yes" && features.loan === "yes") insights.push("💳 Existing housing and personal loans increase monthly financial liabilities.");
  if (campaign > 4) insights.push(`📞 High campaign contact count (${campaign} calls) may lead to client fatigue.`);
  if (insights.length === 0) insights.push(prob_yes > 0.5 ? "👍 Favorable client profile for subscription." : "ℹ️ Standard campaign parameters.");

  return {
    prediction: pred === 1 ? "yes" : "no",
    binary_prediction: pred,
    subscribed: pred === 1,
    probability_yes: prob_yes,
    probability_no: prob_no,
    probability_percentage: prob_pct,
    confidence: Math.abs(prob_yes - 0.5) > 0.3 ? "High" : (Math.abs(prob_yes - 0.5) > 0.15 ? "Moderate" : "Borderline"),
    insights: insights,
    input_summary: features,
    is_fallback: true
  };
}

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState(INITIAL_DEFAULTS);
  const [schema, setSchema] = useState(null);
  const [predictionResult, setPredictionResult] = useState(() => calculateFallbackPrediction(INITIAL_DEFAULTS));
  const [loading, setLoading] = useState(false);
  const [autoPredict, setAutoPredict] = useState(true);
  const [apiConnected, setApiConnected] = useState(true);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Suppress third-party Chrome extension unhandled rejections
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      const reasonStr = String(event.reason?.stack || event.reason?.message || event.reason || "");
      if (reasonStr.includes("chrome-extension://") || reasonStr.includes("M_ID") || reasonStr.includes("bis_skin_checked")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  }, []);

  // Fetch backend schema
  const loadSchema = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/features`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error("Failed to fetch features schema");
      const data = await res.json();
      setSchema(data);
      setApiConnected(true);
      if (data.defaults) {
        setFormData((prev) => ({ ...prev, ...data.defaults }));
      }
      return true;
    } catch (err) {
      console.warn("Flask backend API connecting...", err);
      setApiConnected(false);
      return false;
    }
  }, []);

  // Initial schema load
  useEffect(() => {
    loadSchema();
  }, [loadSchema]);

  // Run prediction API call (or fallback if offline)
  const runPrediction = useCallback(async (currentData, scrollToResult = false) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentData),
        signal: AbortSignal.timeout(3000)
      });

      if (!res.ok) throw new Error("Prediction API error");
      const result = await res.json();
      setPredictionResult(result);
      setUpdateCounter((prev) => prev + 1);
      setApiConnected(true);

      if (scrollToResult) {
        const el = document.getElementById("prediction-result-card");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    } catch (err) {
      console.warn("Using fallback ML prediction model:", err);
      setApiConnected(false);
      setPredictionResult(calculateFallbackPrediction(currentData));
      setUpdateCounter((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial prediction on load
  useEffect(() => {
    runPrediction(formData);
  }, []);

  // Automatic connection polling when disconnected
  useEffect(() => {
    if (apiConnected) return;

    const interval = setInterval(async () => {
      const reconnected = await loadSchema();
      if (reconnected) {
        runPrediction(formData);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [apiConnected, loadSchema, runPrediction, formData]);

  // Handle single feature change
  const handleFeatureChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (autoPredict) {
      runPrediction(updated);
    }
  };

  // Select preset profile from Executive Dashboard
  const handleSelectPreset = (presetData) => {
    const updated = { ...formData, ...presetData };
    setFormData(updated);
    setActiveTab("predictor");
    runPrediction(updated, true);
  };

  // Reset form to defaults
  const handleReset = () => {
    const defaults = schema?.defaults || INITIAL_DEFAULTS;
    setFormData(defaults);
    runPrediction(defaults, true);
  };

  const handleRetryConnection = async () => {
    const success = await loadSchema();
    if (success) {
      runPrediction(formData);
    }
  };

  return (
    <main className="container" suppressHydrationWarning>
      {!apiConnected && (
        <div
          style={{
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            color: "#fef3c7",
            padding: "0.85rem 1.2rem",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.9rem",
            boxShadow: "0 4px 15px rgba(245, 158, 11, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span>🟡</span>
            <span>
              <strong>Connecting to Flask Backend:</strong> Run <code>start.bat</code> in project folder to launch both Python & React servers together.
            </span>
          </div>
          <button
            onClick={handleRetryConnection}
            style={{
              background: "#f59e0b",
              color: "#000",
              border: "none",
              padding: "0.35rem 0.85rem",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "0.82rem",
              whiteSpace: "nowrap",
            }}
          >
            🔄 Check Python API
          </button>
        </div>
      )}

      <Header apiConnected={apiConnected} />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "dashboard" && (
        <ExecutiveDashboard
          onSelectPreset={handleSelectPreset}
          onNavigatePredictor={() => setActiveTab("predictor")}
        />
      )}

      {activeTab === "predictor" && (
        <div className="main-grid">
          <FeatureForm
            formData={formData}
            onChange={handleFeatureChange}
            onReset={handleReset}
            onPredict={() => runPrediction(formData, true)}
            categoricalOptions={schema?.categorical_options || {}}
            numericRanges={schema?.numeric_ranges || {}}
            autoPredict={autoPredict}
            setAutoPredict={setAutoPredict}
            loading={loading}
          />

          <PredictionResult
            result={predictionResult}
            loading={loading}
            isUpdated={updateCounter}
          />
        </div>
      )}

      {activeTab === "analytics" && <ModelAnalytics />}

      {activeTab === "dataset" && <DatasetExplorer />}

      <footer className="app-footer">
        Bank Marketing Campaign Subscription Predictor • Powered by Python Flask & Scikit-Learn Pipeline
      </footer>
    </main>
  );
}
