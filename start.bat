@echo off
cd /d "%~dp0"
echo Starting LFD VSM Landing Page Dev Server...
call npm.cmd run dev
pause
