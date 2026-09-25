"use client";

import dynamic from "next/dynamic";

const MainDashboard = dynamic(() => import("../components/MainDashboard"), {
  ssr: false,
  loading: () => (
    <main className="container" suppressHydrationWarning>
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="loading-spinner" style={{ width: "36px", height: "36px" }} />
      </div>
    </main>
  ),
});

export default function Home() {
  return <MainDashboard />;
}
