"use client";

import React, { useState } from "react";
import { Database, Filter, Search, Table, FileSpreadsheet, CheckCircle, Info } from "lucide-react";

export default function DatasetExplorer() {
  const [searchTerm, setSearchTerm] = useState("");

  const sampleData = [
    { id: 1, age: 58, job: "management", marital: "married", education: "tertiary", balance: 2143, housing: "yes", loan: "no", contact: "cellular", duration: 261, campaign: 1, pdays: -1, poutcome: "unknown", y: "no" },
    { id: 2, age: 44, job: "technician", marital: "single", education: "secondary", balance: 29, housing: "yes", loan: "no", contact: "cellular", duration: 151, campaign: 1, pdays: -1, poutcome: "unknown", y: "no" },
    { id: 3, age: 33, job: "entrepreneur", marital: "married", education: "secondary", balance: 2, housing: "yes", loan: "yes", contact: "cellular", duration: 76, campaign: 1, pdays: -1, poutcome: "unknown", y: "no" },
    { id: 4, age: 47, job: "blue-collar", marital: "married", education: "unknown", balance: 1506, housing: "yes", loan: "no", contact: "cellular", duration: 92, campaign: 1, pdays: -1, poutcome: "unknown", y: "no" },
    { id: 5, age: 35, job: "management", marital: "single", education: "tertiary", balance: 3500, housing: "no", loan: "no", contact: "cellular", duration: 620, campaign: 1, pdays: 180, poutcome: "success", y: "yes" },
    { id: 6, age: 28, job: "student", marital: "single", education: "secondary", balance: 980, housing: "no", loan: "no", contact: "cellular", duration: 410, campaign: 2, pdays: 90, poutcome: "success", y: "yes" },
    { id: 7, age: 60, job: "retired", marital: "married", education: "tertiary", balance: 12500, housing: "no", loan: "no", contact: "cellular", duration: 840, campaign: 1, pdays: 120, poutcome: "success", y: "yes" },
  ];

  const filteredData = sampleData.filter(
    (row) =>
      row.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.marital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} suppressHydrationWarning>
      {/* Dataset Summary Header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
        <div className="glass-card" style={{ padding: "1.4rem", background: "rgba(15, 23, 42, 0.8)" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Total Dataset Rows</span>
          <span style={{ display: "block", fontSize: "2rem", fontWeight: "900", color: "#ffffff", marginTop: "0.3rem" }}>45,211</span>
          <span style={{ fontSize: "0.78rem", color: "#34d399" }}>100% Cleaned & Preprocessed</span>
        </div>
        <div className="glass-card" style={{ padding: "1.4rem", background: "rgba(15, 23, 42, 0.8)" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Input Feature Attributes</span>
          <span style={{ display: "block", fontSize: "2rem", fontWeight: "900", color: "#818cf8", marginTop: "0.3rem" }}>16 Variables</span>
          <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>Demographic, Banking & Contact</span>
        </div>
        <div className="glass-card" style={{ padding: "1.4rem", background: "rgba(15, 23, 42, 0.8)" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Target Class Ratio</span>
          <span style={{ display: "block", fontSize: "2rem", fontWeight: "900", color: "#fbbf24", marginTop: "0.3rem" }}>88% / 12%</span>
          <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>Decline (No) vs Subscribed (Yes)</span>
        </div>
        <div className="glass-card" style={{ padding: "1.4rem", background: "rgba(15, 23, 42, 0.8)" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "700" }}>Missing Values</span>
          <span style={{ display: "block", fontSize: "2rem", fontWeight: "900", color: "#34d399", marginTop: "0.3rem" }}>0 Nulls</span>
          <span style={{ fontSize: "0.78rem", color: "#34d399" }}>Verified in BMC Notebook</span>
        </div>
      </div>

      {/* Dataset Sample Table Card */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Table size={22} style={{ color: "#38bdf8" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: "900", color: "#ffffff" }}>Bank Marketing Campaign Sample Dataset</h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "var(--bg-input)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", padding: "0.4rem 0.9rem" }}>
            <Search size={16} style={{ color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search job, marital, education..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: "none", border: "none", color: "#ffffff", fontSize: "0.85rem", outline: "none", width: "200px" }}
            />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.15)", color: "#94a3b8", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                <th style={{ padding: "0.8rem 1rem" }}>ID</th>
                <th style={{ padding: "0.8rem 1rem" }}>Age</th>
                <th style={{ padding: "0.8rem 1rem" }}>Job</th>
                <th style={{ padding: "0.8rem 1rem" }}>Marital</th>
                <th style={{ padding: "0.8rem 1rem" }}>Education</th>
                <th style={{ padding: "0.8rem 1rem" }}>Balance (€)</th>
                <th style={{ padding: "0.8rem 1rem" }}>Housing</th>
                <th style={{ padding: "0.8rem 1rem" }}>Loan</th>
                <th style={{ padding: "0.8rem 1rem" }}>Call Duration</th>
                <th style={{ padding: "0.8rem 1rem" }}>Poutcome</th>
                <th style={{ padding: "0.8rem 1rem" }}>Subscribed (y)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#f8fafc" }}>
                  <td style={{ padding: "0.8rem 1rem", color: "#94a3b8", fontWeight: "700" }}>#{row.id}</td>
                  <td style={{ padding: "0.8rem 1rem", fontWeight: "700" }}>{row.age}</td>
                  <td style={{ padding: "0.8rem 1rem", textTransform: "capitalize" }}>{row.job}</td>
                  <td style={{ padding: "0.8rem 1rem", textTransform: "capitalize" }}>{row.marital}</td>
                  <td style={{ padding: "0.8rem 1rem", textTransform: "capitalize" }}>{row.education}</td>
                  <td style={{ padding: "0.8rem 1rem", fontWeight: "800", color: row.balance >= 0 ? "#34d399" : "#fb7185" }}>
                    €{row.balance.toLocaleString()}
                  </td>
                  <td style={{ padding: "0.8rem 1rem" }}>{row.housing}</td>
                  <td style={{ padding: "0.8rem 1rem" }}>{row.loan}</td>
                  <td style={{ padding: "0.8rem 1rem", color: "#38bdf8", fontWeight: "700" }}>{row.duration}s</td>
                  <td style={{ padding: "0.8rem 1rem", textTransform: "capitalize" }}>{row.poutcome}</td>
                  <td style={{ padding: "0.8rem 1rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.65rem",
                        borderRadius: "12px",
                        fontSize: "0.78rem",
                        fontWeight: "900",
                        background: row.y === "yes" ? "rgba(16, 185, 129, 0.25)" : "rgba(244, 63, 94, 0.25)",
                        color: row.y === "yes" ? "#34d399" : "#fb7185",
                        border: `1px solid ${row.y === "yes" ? "#10b981" : "#f43f5e"}`,
                      }}
                    >
                      {row.y.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
