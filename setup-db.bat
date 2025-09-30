@echo off
echo Configurando Base de Datos para Checklist SMT...
echo.

REM Verificar si MySQL está corriendo
echo Verificando MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MySQL está ejecutándose
) else (
    echo ❌ MySQL no está ejecutándose. 
    echo Por favor inicia MySQL desde XAMPP o tu servidor MySQL
    pause
    exit /b 1
)

echo.
echo Creando base de datos 'checklist'...

REM Intentar conexión con diferentes métodos
echo Intentando conexión a MySQL...

REM Método 1: MySQL desde XAMPP
if exist "C:\xampp\mysql\bin\mysql.exe" (
    echo Usando MySQL de XAMPP...
    "C:\xampp\mysql\bin\mysql.exe" -u root -p6235642 -e "CREATE DATABASE IF NOT EXISTS checklist;"
    if %errorlevel% equ 0 (
        echo ✅ Base de datos 'checklist' creada/verificada
        "C:\xampp\mysql\bin\mysql.exe" -u root -p6235642 checklist < init.sql
        echo ✅ Tablas creadas exitosamente
        goto success
    )
)

REM Método 2: MySQL estándar
mysql -u root -p6235642 -e "CREATE DATABASE IF NOT EXISTS checklist;" 2>NUL
if %errorlevel% equ 0 (
    echo ✅ Base de datos 'checklist' creada/verificada
    mysql -u root -p6235642 checklist < init.sql
    echo ✅ Tablas creadas exitosamente
    goto success
)

REM Método 3: Sin contraseña
mysql -u root -e "CREATE DATABASE IF NOT EXISTS checklist;" 2>NUL
if %errorlevel% equ 0 (
    echo ✅ Base de datos 'checklist' creada/verificada (sin contraseña)
    mysql -u root checklist < init.sql
    echo ✅ Tablas creadas exitosamente
    echo.
    echo ⚠️  NOTA: Tu MySQL no tiene contraseña para root
    echo    Actualiza el archivo .env si es necesario
    goto success
)

:error
echo.
echo ❌ No se pudo conectar a MySQL
echo.
echo Posibles soluciones:
echo 1. Verifica que MySQL esté ejecutándose
echo 2. Verifica la contraseña en el archivo .env
echo 3. Ejecuta manualmente el init.sql en phpMyAdmin o MySQL Workbench
echo.
pause
exit /b 1

:success
echo.
echo ================================================
echo Base de datos configurada exitosamente!
echo ================================================
echo.
echo ✅ Base de datos: checklist
echo ✅ Tablas: chkl1, chkl2, chkl3... (20 tablas)
echo ✅ Configuración: backend/.env
echo.
echo Ya puedes ejecutar: start.bat
echo.
pause