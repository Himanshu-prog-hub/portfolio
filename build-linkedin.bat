@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  build-linkedin.bat
REM  Rebuilds the LinkedIn Post Generator frontend and copies it into portfolio/public/.
REM  Run this from anywhere — uses absolute paths.
REM
REM  BACKEND NOTE:
REM  The "Generate Post" button calls a Python FastAPI backend.
REM  Run it separately before using the app:
REM    cd D:\Study\Projects\GenAiProject\LinkedinPostGenerator
REM    uvicorn api:app --reload
REM ─────────────────────────────────────────────────────────────────────────────

set "LINKEDIN=D:\Study\Projects\GenAiProject\LinkedinPostGenerator\frontend"
set "PORTFOLIO=D:\Study\Projects\portfolio"

echo [1/3] Building LinkedIn Post Generator frontend...
pushd "%LINKEDIN%"
call npm run build
if errorlevel 1 (
  echo ERROR: Vite build failed. Aborting.
  popd
  exit /b 1
)
popd

echo [2/3] Copying dist to portfolio/public/linkedin-post-generator...
if exist "%PORTFOLIO%\public\linkedin-post-generator" rmdir /s /q "%PORTFOLIO%\public\linkedin-post-generator"
xcopy /E /Y /I "%LINKEDIN%\dist" "%PORTFOLIO%\public\linkedin-post-generator"
if errorlevel 1 (
  echo ERROR: xcopy failed. Check that both paths exist.
  exit /b 1
)

echo [3/3] Done! Files are now at %PORTFOLIO%\public\linkedin-post-generator\
echo       Available at /linkedin-post-generator/ when you run or deploy the portfolio.
echo.
echo       Remember: the Generate button needs the Python backend running:
echo         cd D:\Study\Projects\GenAiProject\LinkedinPostGenerator
echo         uvicorn api:app --reload
pause
