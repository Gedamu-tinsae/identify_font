@echo off
echo Starting PDF Font Identifier application...
echo.

REM Check if backend and frontend directories exist
if not exist "backend" (
    echo Error: backend directory not found!
    exit /b 1
)

if not exist "frontend" (
    echo Error: frontend directory not found!
    exit /b 1
)

REM Start backend in the background
echo Starting backend server...
cd backend
start cmd /c "python app.py"
timeout /t 3 /nobreak >nul
cd ..

REM Start frontend in the background
echo Starting frontend server...
cd frontend
start cmd /c "npm start"
cd ..

echo.
echo Application started successfully!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers.