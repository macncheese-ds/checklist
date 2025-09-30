@echo off
echo Iniciando Sistema de Checklist SMT...
echo.

REM Verificar si MySQL está corriendo
echo Verificando MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MySQL está ejecutándose
) else (
    echo ❌ MySQL no está ejecutándose. Por favor inicia MySQL primero.
    pause
    exit /b 1
)

echo.
echo 1. Construyendo frontend...
call build.bat
if %errorlevel% neq 0 (
    echo Error al construir frontend
    pause
    exit /b 1
)

echo.
echo 2. Iniciando Backend (Puerto 8600)...
cd backend
start "Checklist Backend" cmd /k "npm start"
cd ..

timeout /t 5

echo.
echo 3. Reiniciando Nginx...
REM Parar nginx si está corriendo
taskkill /F /IM nginx.exe 2>NUL

REM Iniciar nginx
start "Nginx" cmd /k "cd C:\nginx && nginx.exe"

timeout /t 3

echo.
echo ================================================
echo Sistema de Checklist SMT iniciado exitosamente!
echo ================================================
echo.
echo 🌐 Acceso a la aplicación:
echo    http://localhost:8501
echo.
echo 🔧 Para desarrollo:
echo    Frontend Dev: http://localhost:3006
echo    Backend API:  http://localhost:8600
echo.
echo 📊 Otras aplicaciones disponibles:
echo    Inventario:        http://localhost
echo    Skill Matrix:      http://localhost:5001
echo    Registro Perfiles: http://localhost:6001
echo    R Calibraciones:   http://localhost:7001
echo    Magazines:         http://localhost:8001
echo    Main:              http://localhost:9001
echo.
echo Presiona cualquier tecla para salir...
pause > nul