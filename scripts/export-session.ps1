# export-session.ps1 — Export a conversation summary to Google Drive
# Usage: pwsh scripts/export-session.ps1 "session description"

param(
    [Parameter(Mandatory = $false, Position = 0)]
    [string]$Description = "sesion-de-trabajo"
)

$driveBase = "G:\Mi unidad\ZeroCode\conversaciones"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$safeName = $Description -replace '[^\w\-]', '-'
$fileName = "${timestamp}_${safeName}.md"
$filePath = Join-Path $driveBase $fileName

# Create directory if it doesn't exist
if (-not (Test-Path $driveBase)) {
    New-Item -ItemType Directory -Path $driveBase -Force | Out-Null
    Write-Host "📁 Created folder: $driveBase" -ForegroundColor Yellow
}

# Get recent git log from all repos
$rootDir = Split-Path -Parent $PSScriptRoot

function Get-RepoLog {
    param([string]$Name, [string]$Path)
    Push-Location $Path
    $log = git log --oneline -5 2>&1
    Pop-Location
    return "### $Name`n``````n$log`n```````n"
}

$repoLogs = ""
$repoLogs += Get-RepoLog "Portfolio (root)" $rootDir
$repoLogs += Get-RepoLog "DevOps.Shop" "$rootDir\apps\devops-shop"
$repoLogs += Get-RepoLog "ZeroDelay" "$rootDir\apps\zerodelay"

# Get modified files
Push-Location $rootDir
$gitStatus = git status --short 2>&1
Pop-Location

$content = @"
# ZeroCode Session Export
**Fecha:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Descripción:** $Description

## Últimos commits por repo

$repoLogs

## Estado actual del repo raíz

``````
$gitStatus
``````

## Notas

> Abre una nueva conversación en el IDE y di:
> "Revisa los últimos commits del monorepo Portfolio y continúa el trabajo."
"@

Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "`n✅ Session exported to Google Drive!" -ForegroundColor Green
Write-Host "📄 $filePath" -ForegroundColor Cyan
