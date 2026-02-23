# sync.ps1 — Pull all repos (root + submodules) in one command
# Usage: pwsh scripts/sync.ps1

Write-Host "`n🔄 Syncing monorepo..." -ForegroundColor Cyan

# Pull root repo
Write-Host "`n📦 Pulling root (Portfolio)..." -ForegroundColor Yellow
git pull origin main
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Failed to pull root repo" -ForegroundColor Red; exit 1 }

# Update submodules
Write-Host "`n📦 Updating submodules..." -ForegroundColor Yellow
git submodule update --init --recursive --remote
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Failed to update submodules" -ForegroundColor Red; exit 1 }

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "`n✅ Everything is up to date!" -ForegroundColor Green
