@echo off
rem Serve the site using Python's simple HTTP server if available
cd /d "%~dp0"
where python >nul 2>&1
if %errorlevel%==0 (
  start "Local Server" python -m http.server 8000
  timeout /t 1 >nul
  start "" http://localhost:8000/index.html
) else (
  echo Python no encontrado en PATH.
  echo Abriendo archivo local index.html en el navegador por defecto...
  start "" "%~dp0index.html"
)
