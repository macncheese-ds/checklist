@echo off
echo Construyendo frontend de Checklist SMT...
echo.

cd C:\app\checklist\frontend

echo Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo Construyendo aplicación...
call npm run build
if %errorlevel% neq 0 (
    echo Error al construir aplicación
    pause
    exit /b 1
)

echo.
echo ¡Build completado exitosamente!
echo Los archivos están en: C:\app\checklist\frontend\dist
echo.
echo Presiona cualquier tecla para continuar...
pause > nul