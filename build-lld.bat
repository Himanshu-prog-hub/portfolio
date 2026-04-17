@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  build-lld.bat
REM  Rebuilds the LLD Playground and copies the output into portfolio/public/.
REM  Run this from D:\Study\Projects\portfolio\ whenever you update the LLD app.
REM ─────────────────────────────────────────────────────────────────────────────

echo [1/3] Building LLD Playground...
pushd "..\Low Level Design\LLDPlayGround"
call npm run build
if errorlevel 1 (
  echo ERROR: Vite build failed. Aborting.
  popd
  exit /b 1
)
popd

echo [2/3] Copying dist to portfolio/public/lld-playground...
if exist "public\lld-playground" rmdir /s /q "public\lld-playground"
xcopy /E /Y /I "..\Low Level Design\LLDPlayGround\dist" "public\lld-playground"

echo [3/3] Done. The LLD Playground is now bundled at public/lld-playground/.
echo       It will be available at /lld-playground/ when you run or deploy the portfolio.
pause
