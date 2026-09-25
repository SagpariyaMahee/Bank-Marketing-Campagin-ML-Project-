"use client";

import React from "react";
import { Activity, Server, CheckCircle2, AlertCircle } from "lucide-react";

export default function Header({ apiConnected }) {
  return (
    <header className="app-header">
      <div className="app-badge">
        <span className={`pulse-dot ${apiConnected ? "green" : "yellow"}`}></span>
        {apiConnected ? <CheckCircle2 size={15} style={{ color: "#34d399" }} /> : <AlertCircle size={15} style={{ color: "#fbbf24" }} />}
        <span>
          {apiConnected
            ? "Bank Marketing ML Predictor • Python Flask API Active (Port 5000)"
            : "Bank Marketing ML Predictor • Auto-Connecting Backend..."}
        </span>
      </div>

      <h1 className="app-title">Term Deposit Subscription Predictor</h1>
      
      <p className="app-subtitle">
        Adjust customer demographics, banking details, contact history, and campaign metrics below to dynamically predict whether the client will subscribe to a term deposit.
      </p>
    </header>
  );
}

