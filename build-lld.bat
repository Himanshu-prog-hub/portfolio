@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  build-lld.bat
REM  Rebuilds the LLD Playground and copies the output into portfolio/public/.
REM  Run this from anywhere — uses absolute paths.
REM ─────────────────────────────────────────────────────────────────────────────

set "LLD=D:\Study\Low Level Design\LLDPlayGround"
set "PORTFOLIO=D:\Study\Projects\portfolio"

echo [1/3] Building LLD Playground...
pushd "%LLD%"
call npm run build
if errorlevel 1 (
  echo ERROR: Vite build failed. Aborting.
  popd
  exit /b 1
)
popd

echo [2/3] Copying dist to portfolio/public/lld-playground...
if exist "%PORTFOLIO%\public\lld-playground" rmdir /s /q "%PORTFOLIO%\public\lld-playground"
xcopy /E /Y /I "%LLD%\dist" "%PORTFOLIO%\public\lld-playground"
if errorlevel 1 (
  echo ERROR: xcopy failed. Check that both paths exist.
  exit /b 1
)

echo [3/3] Done! Files are now at %PORTFOLIO%\public\lld-playground\
echo       It will be available at /lld-playground/ when you run or deploy the portfolio.
pause
