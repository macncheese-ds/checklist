@echo off
echo Obteniendo información de red para Checklist SMT...
echo.

echo 🌐 IP del equipo en la red:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        if not "%%b"=="127.0.0.1" (
            echo    %%b
            set IP=%%b
        )
    )
)

echo.
echo 📱 URLs de acceso desde otros equipos:
echo.
echo 🔧 Desarrollo (puerto 3006):
echo    http://%IP%:3006
echo.
echo 🚀 Producción con Nginx (puerto 8501):
echo    http://%IP%:8501
echo.
echo 🔧 API Backend directo (puerto 8600):
echo    http://%IP%:8600/api/test
echo.
echo 📋 Instrucciones:
echo 1. Asegúrate de que el Firewall de Windows permita estos puertos
echo 2. Desde otro equipo, usa cualquiera de las URLs de arriba
echo 3. Para desarrollo usa: start-dev.bat
echo 4. Para producción usa: start.bat
echo.
echo 🔥 Configuración del Firewall:
echo    - Ve a Windows Defender Firewall
echo    - Permitir una aplicación a través del firewall
echo    - Agregar puertos: 3006, 8501, 8600
echo.

pause