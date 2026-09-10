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

if %errorlevel% neq 0 (
    echo.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo ERROR during npm install!
    echo Check the error message above.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo.
    pause
    exit /b
)

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

if %errorlevel% neq 0 (
    echo.
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo ERROR starting server!
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo.
)

pause
