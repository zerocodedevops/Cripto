# import-session.ps1 — Read and restore the latest session state from Google Drive
# Usage: pwsh scripts/import-session.ps1 [-List]

param(
    [switch]$List
)

$driveBase = "G:\Mi unidad\ZeroCode\conversaciones"
$localBrainBase = "$env:USERPROFILE\.gemini\antigravity\brain"

if (-not (Test-Path $driveBase)) {
    Write-Host "`n❌ Google Drive folder not found: $driveBase" -ForegroundColor Red
    exit 1
}

# Get session folders (new format: folders containing .md and brain/)
# Also support old format for listing if needed, but primary focus is folders.
$sessions = Get-ChildItem $driveBase | Where-Object { $_.PSIsContainer } | Sort-Object LastWriteTime -Descending

if ($sessions.Count -eq 0) {
    Write-Host "`n⚠️  No exported sessions found." -ForegroundColor Yellow
    exit 0
}

if ($List) {
    Write-Host "`n📋 Available sessions ($($sessions.Count)):`n" -ForegroundColor Cyan
    $i = 1
    foreach ($s in $sessions) {
        $date = $s.LastWriteTime.ToString("dd/MM/yyyy HH:mm")
        Write-Host "  $i. $($s.Name) ($date)" -ForegroundColor ($i -eq 1 ? "Green" : "White")
        $i++
    }
    return
}

$latest = $sessions[0]
$summaryFile = Get-ChildItem $latest.FullName -Filter "*.md" | Select-Object -First 1

Write-Host "`n📄 Importing session: $($latest.Name)" -ForegroundColor Cyan
Write-Host "   Date: $($latest.LastWriteTime.ToString('dd/MM/yyyy HH:mm'))" -ForegroundColor DarkGray

# 1. Restore Brain State
$localBrain = Get-ChildItem $localBrainBase | Where-Object { $_.PSIsContainer -and $_.Name -match "^[a-f0-9-]{36}$" } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$remoteBrain = Join-Path $latest.FullName "brain"

if ($localBrain -and (Test-Path $remoteBrain)) {
    Write-Host "`n🧠 Syncing brain context to current conversation: $($localBrain.Name)" -ForegroundColor Magenta
    # Copy contents of remote brain to local brain (overwrite existing task.md, etc.)
    Copy-Item -Path "$remoteBrain\*" -Destination $localBrain.FullName -Recurse -Force
    Write-Host "✅ Brain internal state restored!" -ForegroundColor Green
}
else {
    Write-Host "`n⚠️  Could not restore brain state. Remote brain missing or no active local conversation found." -ForegroundColor Yellow
}

# 2. Show Summary
if ($summaryFile) {
    Write-Host "`n$($("─" * 60))" -ForegroundColor DarkGray
    Get-Content $summaryFile.FullName -Raw -Encoding UTF8
    Write-Host "$("─" * 60)" -ForegroundColor DarkGray
}

Write-Host "`n💡 The AI code assistant now has all the context from the previous session." -ForegroundColor Yellow
Write-Host "🚀 You can now ask: 'Continúa con la tarea según el plan restaurado'." -ForegroundColor Cyan
