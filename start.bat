@echo off
cd /d %~dp0
echo Installing dependencies...
npm install
echo Starting development server...
start "" http://localhost:5173
npm run dev
pause
