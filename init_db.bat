@echo off
REM Script para inicializar la base de datos R.O.S.S.Y
REM Requiere XAMPP instalado en C:\xampp

echo Creando base de datos...
"C:\xampp\mysql\bin\mysql.exe" -u root -p < "sql\rossy_schema.sql"

echo Insertando datos de ejemplo...
"C:\xampp\mysql\bin\mysql.exe" -u root -p < "sql\rossy_seed.sql"

echo Base de datos inicializada correctamente.
pause