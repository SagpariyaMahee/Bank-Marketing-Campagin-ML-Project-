"use client";

import React from "react";
import { LayoutDashboard, SlidersHorizontal, BarChart3, Database } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "Campaign Dashboard", icon: LayoutDashboard },
    { id: "predictor", label: "Live Predictor", icon: SlidersHorizontal },
    { id: "analytics", label: "Model Analytics", icon: BarChart3 },
    { id: "dataset", label: "Dataset Explorer", icon: Database },
  ];

  return (
    <nav
      suppressHydrationWarning
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "2.5rem",
        flexWrap: "wrap",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              padding: "0.75rem 1.4rem",
              borderRadius: "25px",
              fontSize: "0.95rem",
              fontWeight: "800",
              cursor: "pointer",
              border: isActive
                ? "1px solid #818cf8"
                : "1px solid rgba(255, 255, 255, 0.12)",
              background: isActive
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(79, 70, 229, 0.45) 100%)"
                : "rgba(15, 23, 42, 0.7)",
              color: isActive ? "#ffffff" : "#cbd5e1",
              boxShadow: isActive
                ? "0 6px 20px rgba(99, 102, 241, 0.35)"
                : "none",
              transition: "all 0.25s ease",
            }}
          >
            <Icon size={18} style={{ color: isActive ? "#a5b4fc" : "#94a3b8" }} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
