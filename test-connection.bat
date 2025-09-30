@echo off
echo Probando conectividad del sistema Checklist SMT...
echo.

echo 1. Verificando Backend en puerto 8600...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8600/api/test
if %errorlevel% equ 0 (
    echo ✅ Backend responde correctamente
) else (
    echo ❌ Backend no responde - verifica que esté ejecutándose
    echo    Ejecuta: start-dev.bat
    pause
    exit /b 1
)

echo.
echo 2. Probando endpoint de equipos...
curl -s -w "Status: %%{http_code}\n" http://localhost:8600/api/checklist/equipos/1
if %errorlevel% equ 0 (
    echo ✅ Endpoint de equipos funciona
) else (
    echo ❌ Endpoint de equipos no funciona
)

echo.
echo 3. Verificando Frontend en puerto 3006...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:3006
if %errorlevel% equ 0 (
    echo ✅ Frontend responde correctamente
) else (
    echo ❌ Frontend no responde - verifica que esté ejecutándose
)

echo.
echo 4. URLs de acceso:
echo    📱 Frontend: http://localhost:3006
echo    🔧 Backend API: http://localhost:8600/api
echo    🧪 Test endpoint: http://localhost:8600/api/test
echo    📊 Equipos línea 1: http://localhost:8600/api/checklist/equipos/1
echo.

echo Prueba completada. Presiona cualquier tecla para salir...
pause > nul