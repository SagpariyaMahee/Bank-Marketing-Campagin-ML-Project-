"use client";

import React from "react";
import { CheckCircle2, Cpu, Server, Layout, FileCode, Layers, GitBranch } from "lucide-react";

export default function ProjectInfo() {
  const weeks = [
    { week: "Week 1", title: "Problem Definition & Objective Setup", status: "Completed", desc: "Defined binary classification problem predicting whether bank clients subscribe to term deposits based on telemarketing history." },
    { week: "Week 2", title: "Data Ingestion & Integrity Audit", status: "Completed", desc: "Loaded 45,211 raw records. Checked missing values, column data types, and verified target label balance." },
    { week: "Week 3", title: "Exploratory Data Analysis (EDA)", status: "Completed", desc: "Analyzed call duration, balance distributions, job categories, and previous campaign success rates in Jupyter Notebook (BMC.ipynb)." },
    { week: "Week 4", title: "Feature Preprocessing Pipeline", status: "Completed", desc: "Built Scikit-Learn ColumnTransformer using StandardScaler for continuous numbers and OneHotEncoder for categorical attributes." },
    { week: "Week 5", title: "Model Training & Calibration", status: "Completed", desc: "Trained Logistic Regression pipeline model achieving 90.1% test accuracy and 0.912 ROC-AUC." },
    { week: "Week 6", title: "Model Performance Evaluation", status: "Completed", desc: "Evaluated Precision, Recall, F1-Score, ROC Curves, and Confusion Matrices across test splits." },
    { week: "Week 7", title: "Model Export & Serialization", status: "Completed", desc: "Persisted complete preprocessor + model pipeline to models/bank_marketing_pipeline.joblib artifact." },
    { week: "Week 8", title: "Full Stack Flask & React Web Integration", status: "Completed", desc: "Deployed Python Flask REST API backend and Next.js glassmorphism web application." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} suppressHydrationWarning>
      {/* Architecture System Card */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <Layers size={22} style={{ color: "#818cf8" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#ffffff" }}>End-to-End System Architecture</h3>
        </div>
        <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          The web application is structured with decoupled microservices architecture:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.2rem" }}>
          <div style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "12px", padding: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#818cf8", fontWeight: "800", marginBottom: "0.5rem" }}>
              <Layout size={18} />
              <span>Next.js Frontend UI</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
              React 19 & Next.js App Router running on port 3000. Features 16 interactive inputs, live validation, and fallback prediction logic.
            </p>
          </div>

          <div style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(52, 211, 153, 0.3)", borderRadius: "12px", padding: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontWeight: "800", marginBottom: "0.5rem" }}>
              <Server size={18} />
              <span>Python Flask REST API</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
              Flask backend running on port 5000 (`app.py`). Exposes endpoints `/api/predict`, `/api/features`, and `/api/health`.
            </p>
          </div>

          <div style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(251, 191, 36, 0.3)", borderRadius: "12px", padding: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fbbf24", fontWeight: "800", marginBottom: "0.5rem" }}>
              <Cpu size={18} />
              <span>ML Scikit-Learn Pipeline</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
              Pre-trained `.joblib` model artifact containing fitted ColumnTransformer and Logistic Regression classifier.
            </p>
          </div>
        </div>
      </div>

      {/* SOP Timeline Card */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <GitBranch size={22} style={{ color: "#34d399" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#ffffff" }}>
            Project SOP Milestones (Weeks 1 – 8 Execution)
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {weeks.map((w, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem 1.2rem",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
              }}
            >
              <CheckCircle2 size={22} style={{ color: "#34d399", marginTop: "0.2rem", flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: "900", color: "#818cf8", background: "rgba(99, 102, 241, 0.2)", padding: "0.15rem 0.5rem", borderRadius: "6px" }}>
                    {w.week}
                  </span>
                  <span style={{ fontSize: "1rem", fontWeight: "800", color: "#ffffff" }}>{w.title}</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "#cbd5e1", marginTop: "0.2rem" }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
