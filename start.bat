@echo off
title Bank Marketing ML Project Launcher
cls
echo ========================================================
echo   Bank Marketing Campaign ML Subscription Predictor
echo ========================================================
echo.
echo 1. Starting Python Flask Backend Server (Port 5000)...
start "Flask Backend Server (Port 5000)" cmd /k "python app.py"

echo.
echo 2. Waiting for Python ML API to initialize...
powershell -Command "$ready=$false; for ($i=0; $i -lt 15; $i++) { try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:5000/api/health' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { $ready=$true; break } } catch {}; Write-Host '.'; Start-Sleep -Seconds 1 }; if ($ready) { Write-Host '[OK] Flask API connected!' -ForegroundColor Green } else { Write-Host '[!] Flask API launching...' -ForegroundColor Yellow }"

echo.
echo 3. Starting Next.js Frontend Web Server (Port 3000)...
start "Next.js Frontend Server (Port 3000)" cmd /k "cd frontend && npm run dev"

echo.
echo 4. Opening Web Browser at http://localhost:3000 ...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================================
echo  [SUCCESS] All Project Servers Are Launching!
echo  Keep the server windows open during your presentation.
echo ========================================================
echo.
pause

