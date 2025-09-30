@echo off
echo Iniciando Checklist SMT en modo DESARROLLO...
echo.

REM Obtener IP del equipo
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4" ^| findstr /V "127.0.0.1"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set IP=%%b
        goto :found_ip
    )
)
:found_ip

echo 1. Iniciando Backend (Puerto 8600)...
cd backend
start "Checklist Backend" cmd /k "echo Backend iniciando en puerto 8600... && echo IP del servidor: %IP% && npm start"
cd ..

timeout /t 5

echo 2. Probando conexión del backend...
curl -s http://localhost:8600/api/test >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Backend no responde en puerto 8600
)

echo.
echo 3. Iniciando Frontend Dev Server (Puerto 3006)...
cd frontend
start "Checklist Frontend Dev" cmd /k "echo Frontend Dev iniciando en puerto 3006... && echo Acceso desde red: http://%IP%:3006 && npm run dev"
cd ..

echo.
echo ================================================
echo Checklist SMT - MODO DESARROLLO
echo ================================================
echo.
echo 🏠 Enlaces locales:
echo    Frontend: http://localhost:3006
echo    Backend:  http://localhost:8600/api
echo    Test:     http://localhost:8600/api/test
echo.
echo 🌐 Enlaces para otros equipos de la red:
echo    Frontend: http://%IP%:3006
echo    Backend:  http://%IP%:8600/api
echo    Test:     http://%IP%:8600/api/test
echo.
echo 🔍 Para debugging:
echo    - Revisa la consola del Backend para logs
echo    - Abre DevTools en el navegador (F12)
echo.
echo � Nota: Asegúrate de que el Firewall permita los puertos 3006 y 8600
echo.
echo Presiona cualquier tecla para salir...
pause > nul