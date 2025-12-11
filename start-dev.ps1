# Start both backend and frontend in separate PowerShell windows
# Run this script from the repository root: .\start-dev.ps1

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Start backend in a new PowerShell window
Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","cd '$scriptRoot\server'; node server.js"

# Start frontend in a new PowerShell window
Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","cd '$scriptRoot\client'; npm run dev"

Write-Host "Started backend and frontend in separate PowerShell windows." -ForegroundColor Green
