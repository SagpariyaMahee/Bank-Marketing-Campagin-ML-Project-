const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

const projectRoot = __dirname;

function checkBackendRunning() {
  return new Promise((resolve) => {
    const req = http.get("http://127.0.0.1:5000/api/health", (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startAll() {
  console.log("🔍 Checking Python Flask Backend status...");
  const isRunning = await checkBackendRunning();

  let pyProcess = null;

  if (isRunning) {
    console.log("✅ Flask Backend API is already running on http://127.0.0.1:5000");
  } else {
    console.log("🚀 Launching Python Flask Backend Server (app.py)...");
    pyProcess = spawn("python", ["app.py"], {
      cwd: projectRoot,
      stdio: "inherit",
      shell: true,
    });

    pyProcess.on("error", (err) => {
      console.error("❌ Failed to start Python backend process:", err.message);
    });
  }

  console.log("🚀 Launching Next.js Frontend Server...");
  const nextProcess = spawn("npx", ["next", "dev"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  nextProcess.on("error", (err) => {
    console.error("❌ Failed to start Next.js frontend process:", err.message);
  });

  const cleanup = () => {
    if (pyProcess) {
      console.log("\n🛑 Stopping Python Backend process...");
      try {
        pyProcess.kill();
      } catch (e) {}
    }
    process.exit();
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

startAll();
