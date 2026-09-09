@echo off
cls
echo.
echo ======================================
echo   Login Page Setup & Run
echo ======================================
echo.

echo [Step 1] Installing dependencies...
echo.
call npm install

echo.
echo ======================================
echo [Step 2] Starting Server...
echo ======================================
echo.
echo Server running on http://localhost:3000
echo.
echo Open your browser and go to:
echo http://localhost:3000
echo.
echo Keep this window OPEN while using the page
echo Press Ctrl + C to stop the server
echo ======================================
echo.

node server.js

pause
