"use client";

import React from "react";
import {
  TrendingUp,
  Users,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  PhoneCall,
  CheckCircle,
  Briefcase
} from "lucide-react";

export default function ExecutiveDashboard({ onSelectPreset, onNavigatePredictor }) {
  const presets = [
    {
      id: "high_potential",
      title: "🌟 High Potential Executive",
      subtitle: "Long call duration (12 min), €8,500 balance, previous campaign success",
      badge: "High Conversion",
      badgeColor: "#34d399",
      data: {
        age: 58,
        job: "retired",
        marital: "married",
        education: "tertiary",
        default: "no",
        balance: 8500,
        housing: "no",
        loan: "no",
        contact: "cellular",
        day: 15,
        month: "oct",
        duration: 720,
        campaign: 1,
        pdays: 180,
        previous: 3,
        poutcome: "success",
      },
    },
    {
      id: "student_profile",
      title: "🎓 Tech Student Profile",
      subtitle: "Young student, clean credit, no housing/personal loans",
      badge: "Moderate Potential",
      badgeColor: "#38bdf8",
      data: {
        age: 22,
        job: "student",
        marital: "single",
        education: "secondary",
        default: "no",
        balance: 450,
        housing: "no",
        loan: "no",
        contact: "cellular",
        day: 10,
        month: "sep",
        duration: 320,
        campaign: 1,
        pdays: -1,
        previous: 0,
        poutcome: "unknown",
      },
    },
    {
      id: "standard_applicant",
      title: "💼 Standard Applicant",
      subtitle: "Middle-aged worker with housing mortgage loan",
      badge: "Standard Profile",
      badgeColor: "#fbbf24",
      data: {
        age: 40,
        job: "blue-collar",
        marital: "married",
        education: "secondary",
        default: "no",
        balance: 1200,
        housing: "yes",
        loan: "no",
        contact: "cellular",
        day: 20,
        month: "may",
        duration: 180,
        campaign: 2,
        pdays: -1,
        previous: 0,
        poutcome: "unknown",
      },
    },
    {
      id: "low_likelihood",
      title: "⚠️ Low Engagement Contact",
      subtitle: "Very short call (45s), repeated calls, existing loan debt",
      badge: "Low Likelihood",
      badgeColor: "#fb7185",
      data: {
        age: 45,
        job: "services",
        marital: "married",
        education: "primary",
        default: "yes",
        balance: -200,
        housing: "yes",
        loan: "yes",
        contact: "unknown",
        day: 5,
        month: "may",
        duration: 45,
        campaign: 6,
        pdays: -1,
        previous: 0,
        poutcome: "unknown",
      },
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} suppressHydrationWarning>
      {/* Hero Welcome Banner */}
      <div
        className="glass-card"
        style={{
          padding: "2.25rem",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxWidth: "680px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", fontWeight: "800", color: "#a5b4fc", background: "rgba(99, 102, 241, 0.2)", padding: "0.3rem 0.8rem", borderRadius: "20px", width: "fit-content" }}>
            <Sparkles size={15} />
            <span>EXECUTIVE CAMPAIGN INTELLIGENCE</span>
          </div>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "900", color: "#ffffff" }}>
            Bank Term Deposit ML Prediction Dashboard
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6" }}>
            Leverage Scikit-Learn Machine Learning models to predict customer subscription probabilities across 16 demographic, financial, and campaign metrics.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigatePredictor}
          className="btn-primary"
          style={{ padding: "0.9rem 1.6rem", fontSize: "1rem" }}
        >
          <span>Open Interactive Predictor</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* KPI Metric Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.2rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem", background: "rgba(15, 23, 42, 0.85)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Total Dataset Records</span>
            <Users size={20} style={{ color: "#818cf8" }} />
          </div>
          <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "#ffffff", marginTop: "0.3rem", display: "block" }}>45,211</span>
          <span style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: "700" }}>Direct Marketing Campaign</span>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem", background: "rgba(15, 23, 42, 0.85)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Model Test Accuracy</span>
            <Award size={20} style={{ color: "#34d399" }} />
          </div>
          <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "#34d399", marginTop: "0.3rem", display: "block" }}>90.1%</span>
          <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>Logistic Regression Pipeline</span>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem", background: "rgba(15, 23, 42, 0.85)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>ROC-AUC Metric</span>
            <TrendingUp size={20} style={{ color: "#38bdf8" }} />
          </div>
          <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "#38bdf8", marginTop: "0.3rem", display: "block" }}>0.912</span>
          <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>High Discrimination Power</span>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem", background: "rgba(15, 23, 42, 0.85)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Inference Speed</span>
            <Zap size={20} style={{ color: "#fbbf24" }} />
          </div>
          <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "#fbbf24", marginTop: "0.3rem", display: "block" }}>&lt; 15ms</span>
          <span style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: "700" }}>Real-time Flask API Response</span>
        </div>
      </div>

      {/* Preset Scenario Cards */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "900", color: "#ffffff" }}>Quick Customer Profile Presets</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "0.2rem" }}>
              Click any scenario to immediately load the features into the live model predictor.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.data)}
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
              className="preset-hover-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "800", color: "#ffffff", fontSize: "1rem" }}>{preset.title}</span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: "900",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "12px",
                    background: `${preset.badgeColor}22`,
                    color: preset.badgeColor,
                    border: `1px solid ${preset.badgeColor}55`,
                  }}
                >
                  {preset.badge}
                </span>
              </div>
              <p style={{ fontSize: "0.84rem", color: "#cbd5e1", lineHeight: "1.5" }}>{preset.subtitle}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#818cf8", fontWeight: "700", marginTop: "0.4rem" }}>
                <span>Load into Predictor</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Model Highlights & Insights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <PhoneCall size={20} style={{ color: "#34d399" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>Top Positive Influencers</h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem", color: "#cbd5e1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={16} style={{ color: "#34d399" }} />
              <span><strong>Call Duration &gt; 6 mins</strong>: +85% conversion boost</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={16} style={{ color: "#34d399" }} />
              <span><strong>Previous Campaign Success</strong>: +92% conversion likelihood</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={16} style={{ color: "#34d399" }} />
              <span><strong>Account Balance &gt; €3,000</strong>: Strong disposable capacity</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Target size={20} style={{ color: "#fb7185" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>Primary Friction Factors</h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem", color: "#cbd5e1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fb7185", fontWeight: "900" }}>•</span>
              <span><strong>Short Call Duration (&lt; 2 mins)</strong>: Severe drop in conversion</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fb7185", fontWeight: "900" }}>•</span>
              <span><strong>Housing & Personal Loans</strong>: High financial liabilities</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#fb7185", fontWeight: "900" }}>•</span>
              <span><strong>High Campaign Calls (&gt; 4)</strong>: Client contact fatigue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
