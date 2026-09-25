"use client";

import React from "react";
import { User, CreditCard, Phone, BarChart2, RefreshCw, Play, SlidersHorizontal } from "lucide-react";

export default function FeatureForm({
  formData,
  onChange,
  onReset,
  onPredict,
  categoricalOptions,
  numericRanges,
  autoPredict,
  setAutoPredict,
  loading,
}) {
  const formatDurationHint = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${seconds}s ${mins > 0 ? `(${mins}m ${secs}s)` : ""}`;
  };

  const handleSliderChange = (field, value) => {
    onChange(field, Number(value));
  };

  const handleTextChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="glass-card form-card" suppressHydrationWarning>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-card)", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <SlidersHorizontal size={22} style={{ color: "#818cf8" }} />
          <h3 style={{ fontSize: "1.25rem", fontWeight: "900", color: "#ffffff" }}>Customer Feature Inputs</h3>
        </div>
        <span style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: "700", background: "rgba(255, 255, 255, 0.08)", padding: "0.3rem 0.7rem", borderRadius: "20px" }}>
          16 Input Variables
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* SECTION 1: Demographics & Financials */}
        <div className="form-section-block">
          <div className="section-label" style={{ color: "#818cf8", fontSize: "0.88rem", marginBottom: "1rem" }}>
            <User size={16} />
            <span>1. Customer Demographics & Account</span>
          </div>

          <div className="form-group-grid">
            {/* Age */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Age</label>
                <span className="label-val">{formData.age} yrs</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={numericRanges.age?.min || 18}
                  max={numericRanges.age?.max || 95}
                  step={1}
                  value={formData.age}
                  onChange={(e) => handleSliderChange("age", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  min={18}
                  max={95}
                  value={formData.age}
                  onChange={(e) => handleSliderChange("age", e.target.value)}
                />
              </div>
            </div>

            {/* Job Sector */}
            <div className="input-field">
              <label className="label-title">Job Sector</label>
              <select
                className="custom-select"
                value={formData.job}
                onChange={(e) => handleTextChange("job", e.target.value)}
              >
                {(categoricalOptions.job || []).map((j) => (
                  <option key={j} value={j}>
                    {j.charAt(0).toUpperCase() + j.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Marital Status */}
            <div className="input-field">
              <label className="label-title">Marital Status</label>
              <div className="pill-group">
                {(categoricalOptions.marital || ["single", "married", "divorced"]).map((m) => (
                  <button
                    type="button"
                    key={m}
                    className={`pill-btn ${formData.marital === m ? "active" : ""}`}
                    onClick={() => handleTextChange("marital", m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="input-field">
              <label className="label-title">Education Level</label>
              <select
                className="custom-select"
                value={formData.education}
                onChange={(e) => handleTextChange("education", e.target.value)}
              >
                {(categoricalOptions.education || []).map((ed) => (
                  <option key={ed} value={ed}>
                    {ed.charAt(0).toUpperCase() + ed.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Credit Default */}
            <div className="input-field">
              <label className="label-title">Credit in Default?</label>
              <div className="pill-group">
                {["no", "yes"].map((d) => (
                  <button
                    type="button"
                    key={d}
                    className={`pill-btn ${formData.default === d ? "active" : ""}`}
                    onClick={() => handleTextChange("default", d)}
                  >
                    {d === "yes" ? "Yes (In Default)" : "No (Clean)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Average Annual Balance */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Average Annual Balance (€)</label>
                <span className="label-val">€{Number(formData.balance).toLocaleString()}</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={-2000}
                  max={30000}
                  step={100}
                  value={formData.balance}
                  onChange={(e) => handleSliderChange("balance", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  style={{ width: "95px" }}
                  value={formData.balance}
                  onChange={(e) => handleSliderChange("balance", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Loans & Assets */}
        <div className="form-section-block">
          <div className="section-label" style={{ color: "#38bdf8", fontSize: "0.88rem", marginBottom: "1rem" }}>
            <CreditCard size={16} />
            <span>2. Loans & Financial Liabilities</span>
          </div>

          <div className="form-group-grid">
            {/* Housing Loan */}
            <div className="input-field">
              <label className="label-title">Housing Mortgage Loan</label>
              <div className="pill-group">
                {["no", "yes"].map((val) => (
                  <button
                    type="button"
                    key={val}
                    className={`pill-btn ${formData.housing === val ? "active" : ""}`}
                    onClick={() => handleTextChange("housing", val)}
                    style={
                      formData.housing === val
                        ? { background: val === "no" ? "rgba(16, 185, 129, 0.25)" : "rgba(244, 63, 94, 0.25)", borderColor: val === "no" ? "#10b981" : "#f43f5e" }
                        : {}
                    }
                  >
                    {val === "yes" ? "🏠 Has Housing Loan" : "✅ No Housing Loan"}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Loan */}
            <div className="input-field">
              <label className="label-title">Personal Credit Loan</label>
              <div className="pill-group">
                {["no", "yes"].map((val) => (
                  <button
                    type="button"
                    key={val}
                    className={`pill-btn ${formData.loan === val ? "active" : ""}`}
                    onClick={() => handleTextChange("loan", val)}
                    style={
                      formData.loan === val
                        ? { background: val === "no" ? "rgba(16, 185, 129, 0.25)" : "rgba(244, 63, 94, 0.25)", borderColor: val === "no" ? "#10b981" : "#f43f5e" }
                        : {}
                    }
                  >
                    {val === "yes" ? "💳 Has Personal Loan" : "✅ No Personal Loan"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Communication & Call Details */}
        <div className="form-section-block">
          <div className="section-label" style={{ color: "#34d399", fontSize: "0.88rem", marginBottom: "1rem" }}>
            <Phone size={16} />
            <span>3. Current Campaign Call & Contact Details</span>
          </div>

          <div className="form-group-grid">
            {/* Communication Type */}
            <div className="input-field">
              <label className="label-title">Communication Method</label>
              <select
                className="custom-select"
                value={formData.contact}
                onChange={(e) => handleTextChange("contact", e.target.value)}
              >
                {(categoricalOptions.contact || []).map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Month */}
            <div className="input-field">
              <label className="label-title">Last Contact Month</label>
              <select
                className="custom-select"
                value={formData.month}
                onChange={(e) => handleTextChange("month", e.target.value)}
              >
                {(categoricalOptions.month || []).map((m) => (
                  <option key={m} value={m}>
                    {m.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Day */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Day of Month</label>
                <span className="label-val">Day {formData.day}</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={1}
                  max={31}
                  step={1}
                  value={formData.day}
                  onChange={(e) => handleSliderChange("day", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  min={1}
                  max={31}
                  value={formData.day}
                  onChange={(e) => handleSliderChange("day", e.target.value)}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Call Duration (seconds)</label>
                <span className="label-val" style={{ color: "#34d399" }}>
                  {formatDurationHint(formData.duration)}
                </span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={0}
                  max={2000}
                  step={5}
                  value={formData.duration}
                  onChange={(e) => handleSliderChange("duration", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  min={0}
                  max={3600}
                  value={formData.duration}
                  onChange={(e) => handleSliderChange("duration", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Campaign & Previous History */}
        <div className="form-section-block">
          <div className="section-label" style={{ color: "#fbbf24", fontSize: "0.88rem", marginBottom: "1rem" }}>
            <BarChart2 size={16} />
            <span>4. Campaign & Historical Context</span>
          </div>

          <div className="form-group-grid">
            {/* Campaign Calls */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Campaign Call Count</label>
                <span className="label-val">{formData.campaign} call(s)</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={1}
                  max={30}
                  step={1}
                  value={formData.campaign}
                  onChange={(e) => handleSliderChange("campaign", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  min={1}
                  max={50}
                  value={formData.campaign}
                  onChange={(e) => handleSliderChange("campaign", e.target.value)}
                />
              </div>
            </div>

            {/* pdays */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Days Since Prev. Campaign (pdays)</label>
                <span className="label-val">
                  {formData.pdays === -1 ? "Never (-1)" : `${formData.pdays} days`}
                </span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={-1}
                  max={500}
                  step={1}
                  value={formData.pdays}
                  onChange={(e) => handleSliderChange("pdays", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  min={-1}
                  max={870}
                  value={formData.pdays}
                  onChange={(e) => handleSliderChange("pdays", e.target.value)}
                />
              </div>
            </div>

            {/* Previous contacts */}
            <div className="input-field">
              <div className="input-label-row">
                <label className="label-title">Previous Contacts Count</label>
                <span className="label-val">{formData.previous} contacts</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  className="custom-slider"
                  min={0}
                  max={25}
                  step={1}
                  value={formData.previous}
                  onChange={(e) => handleSliderChange("previous", e.target.value)}
                />
                <input
                  type="number"
                  className="number-input"
                  min={0}
                  max={50}
                  value={formData.previous}
                  onChange={(e) => handleSliderChange("previous", e.target.value)}
                />
              </div>
            </div>

            {/* Previous outcome */}
            <div className="input-field">
              <label className="label-title">Previous Campaign Outcome (poutcome)</label>
              <select
                className="custom-select"
                value={formData.poutcome}
                onChange={(e) => handleTextChange("poutcome", e.target.value)}
              >
                {(categoricalOptions.poutcome || []).map((po) => (
                  <option key={po} value={po}>
                    {po === "success"
                      ? "🎉 Success (Subscribed Previously)"
                      : po === "failure"
                      ? "❌ Failure (Did Not Subscribe)"
                      : po === "other"
                      ? "🔄 Other Outcome"
                      : "❓ Unknown / First Time"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="form-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={onPredict}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="loading-spinner" />
              Calculating Model Prediction...
            </>
          ) : (
            <>
              <Play size={18} /> Run Model Prediction
            </>
          )}
        </button>

        <button type="button" className="btn-secondary" onClick={onReset}>
          <RefreshCw size={16} /> Reset Features
        </button>

        <label className="toggle-container">
          <div
            className={`toggle-switch ${autoPredict ? "on" : ""}`}
            onClick={() => setAutoPredict(!autoPredict)}
          >
            <div className="toggle-handle" />
          </div>
          <span>Auto-Predict</span>
        </label>
      </div>
    </div>
  );
}
