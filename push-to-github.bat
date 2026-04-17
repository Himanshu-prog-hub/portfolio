@echo off
title Portfolio - Commit and Push to GitHub
color 0A

echo ============================================
echo   Portfolio - Local Test + GitHub Push
echo ============================================
echo.

cd /d "%~dp0"

echo [1/5] Cleaning up any stale git lock files...
if exist ".git\index.lock" (
    del /f ".git\index.lock"
    echo      Lock file removed.
) else (
    echo      No lock file found. All good.
)
echo.

echo [2/5] Running a quick build check...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo  !! Build failed. Please fix the errors above before pushing.
    pause
    exit /b 1
)
echo.
echo      Build passed!
echo.

echo [3/5] Staging all changes...
git add .
echo.

echo [4/5] Committing changes...
git commit -m "Add TechStack component, update all components with latest data and assets"
if %errorlevel% neq 0 (
    echo      Nothing new to commit, or commit failed.
)
echo.

echo [5/5] Pushing to GitHub...
git push origin master
if %errorlevel% neq 0 (
    echo.
    echo  !! Push failed. You may need to log into GitHub.
    echo     Try running: git push origin master
    pause
    exit /b 1
)

echo.
echo ============================================
echo   SUCCESS! Your portfolio is on GitHub.
echo ============================================
echo.
pause
