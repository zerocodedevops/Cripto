# export-session.ps1 — Export a conversation summary and brain to Google Drive
# Usage: pwsh scripts/export-session.ps1 "session description"

param(
    [Parameter(Mandatory = $false, Position = 0)]
    [string]$Description = "sesion-de-trabajo"
)

$driveBase = "G:\Mi unidad\ZeroCode\conversaciones"
$localBrainBase = "$env:USERPROFILE\.gemini\antigravity\brain"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$safeName = $Description -replace '[^\w\-]', '-'
$sessionFolder = Join-Path $driveBase "${timestamp}_${safeName}"
$fileName = "${timestamp}_${safeName}.md"
$filePath = Join-Path $sessionFolder $fileName

# Create session directory
if (-not (Test-Path $sessionFolder)) {
    New-Item -ItemType Directory -Path $sessionFolder -Force | Out-Null
    Write-Host "📁 Created session folder: $sessionFolder" -ForegroundColor Yellow
}

# Identify the most recent conversation brain folder
$latestBrain = Get-ChildItem $localBrainBase | Where-Object { $_.PSIsContainer -and $_.Name -match "^[a-f0-9-]{36}$" } | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($latestBrain) {
    $brainDest = Join-Path $sessionFolder "brain"
    Write-Host "🧠 Exporting brain state from: $($latestBrain.Name)" -ForegroundColor Magenta
    Copy-Item -Path $latestBrain.FullName -Destination $brainDest -Recurse -Force
}

# Get recent git log from all repos
$rootDir = Split-Path -Parent $PSScriptRoot

function Get-RepoLog {
    param([string]$Name, [string]$Path)
    if (-not (Test-Path $Path)) { return "### $Name`n⚠️ Path not found: $Path`n" }
    Push-Location $Path
    $log = git log --oneline -5 2>&1
    Pop-Location
    return "### $Name`n``````n$log`n```````n"
}

$repoLogs = ""
$repoLogs += Get-RepoLog "Portfolio (root)" $rootDir
$repoLogs += Get-RepoLog "DevOps.Shop" "$rootDir\apps\devops-shop"
$repoLogs += Get-RepoLog "ZeroDelay" "$rootDir\apps\zerodelay"
$repoLogs += Get-RepoLog "Mudanzas Coral" "$rootDir\src\features\projects\mudanzas-coral"

# Get modified files
Push-Location $rootDir
$gitStatus = git status --short 2>&1
Pop-Location

$content = @"
# ZeroCode Session Export
**Fecha:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Descripción:** $Description
**Brain ID:** $($latestBrain.Name)

## Últimos commits por repo

$repoLogs

## Estado actual del repo raíz

``````
$gitStatus
``````

## Notas

> 1. Abre este proyecto en el nuevo ordenador.
> 2. Ejecuta `npm run import-session` para restaurar el contexto de la IA.
> 3. En la nueva conversación, la IA detectará los archivos restaurados y sabrá por dónde seguir.
"@

Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "`n✅ Session and Brain exported to Google Drive!" -ForegroundColor Green
Write-Host "📄 $filePath" -ForegroundColor Cyan
