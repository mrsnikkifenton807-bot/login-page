@echo off
echo.
echo ======================================
echo   Login Page Setup & Run
echo ======================================
echo.

echo Installing dependencies...
call npm install

echo.
echo ======================================
echo Starting Server...
echo ======================================
echo.
echo Server running on http://localhost:3000
echo.
echo Open your browser and go to:
echo http://localhost:3000
echo.
echo Press Ctrl + C to stop the server
echo ======================================
echo.

node server.js

pause
