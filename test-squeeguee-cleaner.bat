@echo off
echo Probando Checklist #2 - Squeeguee Cleaner...
echo.

echo 1. Probando endpoint de equipos para línea Lavado...
curl -s "http://localhost:8600/api/checklist/equipos/Lavado"
echo.
echo.

echo 2. Probando checklist de Squeeguee Cleaner...
curl -s "http://localhost:8600/api/checklist/checklist/Squeeguee%%20Cleaner"
echo.
echo.

echo 3. URLs de prueba:
echo    Equipos Lavado: http://localhost:8600/api/checklist/equipos/Lavado
echo    Checklist: http://localhost:8600/api/checklist/checklist/Squeeguee%%20Cleaner
echo.

echo 4. Elementos del checklist:
echo    1. Limpieza de la parte frontal del equipo (Visual)
echo    2. Funcionamiento correcto de las torretas (Visual)
echo    3. Válvula para desagüe cerrada (Visual)
echo    4. Funcionamiento del paro de emergencia (Visual)
echo    5. Área de trabajo libre de obstrucciones (Visual)
echo.

echo 5. Todos los elementos son de inspección visual con opciones:
echo    - OK / NO OK / N/A
echo.

pause