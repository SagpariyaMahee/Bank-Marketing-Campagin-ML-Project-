"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Lightbulb,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Target,
  UserCheck,
  BarChart3,
  Award,
  Clock,
  Zap
} from "lucide-react";

export default function PredictionResult({ result, loading, isUpdated }) {
  const [showRaw, setShowRaw] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (result) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(timer);
    }
  }, [result, isUpdated]);

  if (loading && !result) {
    return (
      <div className="glass-card result-card" style={{ alignItems: "center", justifyContent: "center", minHeight: "450px" }}>
        <div className="loading-spinner" style={{ width: "42px", height: "42px" }} />
        <p style={{ color: "#ffffff", marginTop: "1rem", fontWeight: "700" }}>Calculating Model Prediction...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-card result-card" style={{ alignItems: "center", justifyContent: "center", minHeight: "450px", textAlign: "center" }}>
        <TrendingUp size={54} style={{ color: "var(--primary)", opacity: 0.8 }} />
        <h3 style={{ color: "#ffffff", marginTop: "1rem", fontSize: "1.2rem", fontWeight: "800" }}>Ready for Prediction</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "300px", marginTop: "0.5rem" }}>
          Adjust the customer features on the left and click <strong>"Run Model Prediction"</strong> to see the detailed evaluation.
        </p>
      </div>
    );
  }

  const { subscribed, probability_percentage, probability_yes, probability_no, confidence, insights, input_summary } = result;
  const isYes = subscribed || probability_percentage >= 50;

  // Calculate circular conic-gradient for gauge rim
  const fillDeg = Math.round((probability_percentage / 100) * 360);
  const gaugeRimStyle = {
    background: `conic-gradient(${
      isYes ? "#10b981" : "#f43f5e"
    } 0deg ${fillDeg}deg, rgba(255, 255, 255, 0.12) ${fillDeg}deg 360deg)`,
  };

  // Derive Customer Persona Metrics
  const duration = input_summary?.duration || 0;
  const balance = input_summary?.balance || 0;
  const pdays = input_summary?.pdays || -1;

  const engagementScore = duration > 400 ? "High Interest" : duration > 180 ? "Moderate" : "Low Contact";
  const financialTier = balance > 3000 ? "High Balance" : balance > 500 ? "Standard Balance" : "Low Balance";

  return (
    <div className={`glass-card result-card ${flash ? "updated-flash" : ""}`} id="prediction-result-card" suppressHydrationWarning>
      {/* Header & Confidence */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Award size={20} style={{ color: "#818cf8" }} />
          <h3 style={{ fontSize: "1.25rem", fontWeight: "900", color: "#ffffff" }}>Prediction Intelligence</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.85rem", color: "#cbd5e1", background: "rgba(99, 102, 241, 0.2)", padding: "0.35rem 0.8rem", borderRadius: "20px", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
          <ShieldCheck size={16} style={{ color: "#a5b4fc" }} />
          <span style={{ fontWeight: "700" }}>{confidence} Confidence</span>
        </div>
      </div>

      {/* High-Contrast Circular Radial Gauge */}
      <div className="gauge-wrapper">
        <div className="gauge-circle" style={gaugeRimStyle}>
          <div className="gauge-inner-card">
            <span className="gauge-percentage">
              {probability_percentage}%
            </span>
            <span className="gauge-label">Subscribed Prob.</span>
          </div>
        </div>
      </div>

      {/* Subscription Status Badge */}
      <div className={`status-badge ${isYes ? "yes" : "no"}`}>
        {isYes ? (
          <>
            <CheckCircle2 size={26} />
            <span>HIGH LIKELIHOOD — SUBSCRIBED (YES)</span>
          </>
        ) : (
          <>
            <XCircle size={26} />
            <span>LOW LIKELIHOOD — DECLINE (NO)</span>
          </>
        )}
      </div>

      {/* Dual Metric Breakdown Cards (Yes vs No) */}
      <div className="metrics-dual-grid">
        <div className="metric-card yes-card">
          <span className="metric-card-val" style={{ color: "#34d399" }}>
            {probability_percentage}%
          </span>
          <span className="metric-card-lbl">Conversion (Yes)</span>
        </div>
        <div className="metric-card no-card">
          <span className="metric-card-val" style={{ color: "#fb7185" }}>
            {(100 - probability_percentage).toFixed(1)}%
          </span>
          <span className="metric-card-lbl">Decline (No)</span>
        </div>
      </div>

      {/* Probability Track Bar */}
      <div className="probability-bar-container">
        <div className="prob-labels">
          <span style={{ color: "#34d399" }}>Yes: {probability_percentage}%</span>
          <span style={{ color: "#fb7185" }}>No: {(100 - probability_percentage).toFixed(1)}%</span>
        </div>
        <div className="prob-track">
          <div className="prob-fill" style={{ width: `${probability_percentage}%` }} />
        </div>
      </div>

      {/* Customer Profile & Tier Badges */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "var(--radius-md)",
          padding: "1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase" }}>
            <Clock size={14} style={{ color: "#38bdf8" }} />
            <span>Engagement Tier</span>
          </div>
          <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "#ffffff" }}>{engagementScore}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase" }}>
            <UserCheck size={14} style={{ color: "#4ade80" }} />
            <span>Financial Capacity</span>
          </div>
          <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "#ffffff" }}>{financialTier}</span>
        </div>
      </div>

      {/* Recommended Marketing Action Box */}
      <div
        style={{
          background: isYes ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
          border: `1px solid ${isYes ? "rgba(16, 185, 129, 0.35)" : "rgba(245, 158, 11, 0.35)"}`,
          borderRadius: "var(--radius-md)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "800", fontSize: "0.85rem", color: isYes ? "#34d399" : "#fbbf24" }}>
          <Target size={16} />
          <span>RECOMMENDED AGENT STRATEGY</span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "#f8fafc", lineHeight: "1.5", fontWeight: "500" }}>
          {isYes
            ? "🎯 Priority Follow-Up: Client displays strong subscription indicators. Schedule direct agent call and dispatch term deposit enrollment pack."
            : "💡 Strategic Nurturing: Low initial subscription probability. Offer customized low-deposit plans or follow up after 30 days."}
        </p>
      </div>

      {/* Dynamic Factor Insights */}
      {insights && insights.length > 0 && (
        <div className="insights-box">
          <div className="section-label" style={{ marginBottom: "0.4rem" }}>
            <Lightbulb size={16} style={{ color: "#fbbf24" }} />
            <span style={{ color: "#ffffff" }}>Key Model Factor Drivers</span>
          </div>
          {insights.map((insight, idx) => (
            <div key={idx} className="insight-item">
              <span>{insight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Model Telemetry Box */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "var(--radius-md)",
          padding: "0.9rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.8rem",
          color: "#94a3b8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <BarChart3 size={14} style={{ color: "#6366f1" }} />
          <span>Logistic Regression ML Engine</span>
        </div>
        <span style={{ fontWeight: "700", color: "#cbd5e1" }}>52 Features Processed</span>
      </div>

      {/* Raw JSON Debugging */}
      <div style={{ borderTop: "1px solid var(--border-card)", paddingTop: "0.8rem" }}>
        <button
          type="button"
          onClick={() => setShowRaw(!showRaw)}
          style={{
            background: "none",
            border: "none",
            color: "#94a3b8",
            fontSize: "0.82rem",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <span>Raw Model Output Metadata</span>
          {showRaw ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showRaw && (
          <pre
            style={{
              background: "#020617",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "1rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8rem",
              color: "#6ee7b7",
              marginTop: "0.6rem",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
