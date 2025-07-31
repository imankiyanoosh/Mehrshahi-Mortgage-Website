@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "D:\AI Coder\VS Code\Mortgage\Mehrshahi-Mortgage-Website"

if "%1"=="install" (
    npm install
) else (
    npm run dev
)
