# push-all.ps1 — Commit and push all repos in one command
# Usage: pwsh scripts/push-all.ps1 "your commit message"

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$Message
)

$rootDir = Split-Path -Parent $PSScriptRoot
$failed = $false

function Push-Repo {
    param([string]$Name, [string]$Path)

    Push-Location $Path

    $status = git status --porcelain
    if ($status) {
        Write-Host "`n📦 [$Name] Staging and committing changes..." -ForegroundColor Yellow
        git add -A
        git commit -m $Message
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ [$Name] Commit failed" -ForegroundColor Red
            $script:failed = $true
            Pop-Location
            return
        }
    } else {
        Write-Host "`n✔️  [$Name] No changes to commit" -ForegroundColor DarkGray
    }

    # Always try to push (in case there are unpushed commits)
    Write-Host "🚀 [$Name] Pushing to GitHub..." -ForegroundColor Cyan
    git push origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ [$Name] Push failed" -ForegroundColor Red
        $script:failed = $true
    } else {
        Write-Host "✅ [$Name] Done!" -ForegroundColor Green
    }

    Pop-Location
}

Write-Host "`n🔄 Pushing all repos with message: `"$Message`"" -ForegroundColor Cyan

# 1. Push submodules first (so root tracks updated commits)
Push-Repo "DevOps.Shop" "$rootDir\apps\devops-shop"
Push-Repo "ZeroDelay"   "$rootDir\apps\zerodelay"

# 2. Push root repo last (will include updated submodule refs)
Push-Repo "Portfolio"   $rootDir

if ($failed) {
    Write-Host "`n⚠️  Some repos had errors. Check the output above." -ForegroundColor Red
    exit 1
} else {
    Write-Host "`n🎉 All repos pushed successfully!" -ForegroundColor Green
}
