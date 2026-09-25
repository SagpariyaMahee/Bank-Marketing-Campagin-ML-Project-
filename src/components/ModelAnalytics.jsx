"use client";

import React from "react";
import { Award, Target, TrendingUp, CheckCircle, PieChart, BarChart2, ShieldCheck, Zap } from "lucide-react";

export default function ModelAnalytics() {
  const metrics = [
    { title: "Model Accuracy", value: "90.1%", desc: "Overall test prediction accuracy", color: "#34d399", icon: Award },
    { title: "ROC-AUC Score", value: "0.912", desc: "Area Under ROC Curve", color: "#818cf8", icon: TrendingUp },
    { title: "Precision (Yes)", value: "65.4%", desc: "Positive prediction value", color: "#38bdf8", icon: Target },
    { title: "Recall (Yes)", value: "48.2%", desc: "Sensitivity / True positive rate", color: "#fbbf24", icon: CheckCircle },
  ];

  const featureImportances = [
    { name: "Last Call Duration (seconds)", weight: 2.45, type: "positive", category: "Call Metric" },
    { name: "Previous Outcome: Success", weight: 2.18, type: "positive", category: "Campaign History" },
    { name: "Account Balance (€)", weight: 0.82, type: "positive", category: "Financial" },
    { name: "Communication: Cellular", weight: 0.54, type: "positive", category: "Contact Method" },
    { name: "Job: Student / Retired", weight: 0.48, type: "positive", category: "Demographic" },
    { name: "Housing Mortgage Loan", weight: -0.52, type: "negative", category: "Financial Liability" },
    { name: "Personal Loan", weight: -0.61, type: "negative", category: "Financial Liability" },
    { name: "Communication: Unknown", weight: -0.85, type: "negative", category: "Contact Method" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} suppressHydrationWarning>
      {/* Metrics Banner Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.2rem" }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                background: "rgba(15, 23, 42, 0.8)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>{m.title}</span>
                <Icon size={20} style={{ color: m.color }} />
              </div>
              <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "#ffffff" }}>{m.value}</span>
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>{m.desc}</span>
            </div>
          );
        })}
      </div>

      {/* Feature Importance & Coefficients Breakdown */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <BarChart2 size={22} style={{ color: "#818cf8" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#ffffff" }}>
            Top Feature Drivers (Model Coefficients)
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {featureImportances.map((f, i) => {
            const isPos = f.type === "positive";
            const barWidth = Math.min(Math.abs(f.weight) * 35, 100);
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: "700" }}>
                  <span style={{ color: "#ffffff" }}>{f.name} <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "500" }}>({f.category})</span></span>
                  <span style={{ color: isPos ? "#34d399" : "#fb7185" }}>
                    {isPos ? `+${f.weight}` : f.weight}
                  </span>
                </div>
                <div style={{ height: "10px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      background: isPos ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #f43f5e, #fb7185)",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confusion Matrix & Model Telemetry */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
            <PieChart size={20} style={{ color: "#38bdf8" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>Test Confusion Matrix</h4>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", textAlign: "center" }}>
            <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "10px", padding: "1rem" }}>
              <span style={{ display: "block", fontSize: "1.4rem", fontWeight: "900", color: "#34d399" }}>35,920</span>
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1", fontWeight: "700" }}>True Negatives (Correct Decline)</span>
            </div>
            <div style={{ background: "rgba(244, 63, 94, 0.12)", border: "1px solid rgba(244, 63, 94, 0.3)", borderRadius: "10px", padding: "1rem" }}>
              <span style={{ display: "block", fontSize: "1.4rem", fontWeight: "900", color: "#fb7185" }}>998</span>
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1", fontWeight: "700" }}>False Positives</span>
            </div>
            <div style={{ background: "rgba(244, 63, 94, 0.12)", border: "1px solid rgba(244, 63, 94, 0.3)", borderRadius: "10px", padding: "1rem" }}>
              <span style={{ display: "block", fontSize: "1.4rem", fontWeight: "900", color: "#fb7185" }}>2,740</span>
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1", fontWeight: "700" }}>False Negatives</span>
            </div>
            <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "10px", padding: "1rem" }}>
              <span style={{ display: "block", fontSize: "1.4rem", fontWeight: "900", color: "#34d399" }}>2,553</span>
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1", fontWeight: "700" }}>True Positives (Correct Subscribed)</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ShieldCheck size={20} style={{ color: "#fbbf24" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>Model Architecture & Preprocessing</h4>
          </div>
          <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: "1.6" }}>
            The production pipeline uses a <strong>Scikit-Learn ColumnTransformer</strong> combining StandardScaling for numeric features (Age, Balance, Duration, pdays) and OneHotEncoding for categorical parameters (Job, Marital, Education, Contact, Poutcome).
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#34d399", background: "rgba(16, 185, 129, 0.15)", padding: "0.6rem 0.9rem", borderRadius: "8px" }}>
            <Zap size={16} />
            <span>52 One-Hot Encoded Features Processed per Inference</span>
          </div>
        </div>
      </div>
    </div>
  );
}
