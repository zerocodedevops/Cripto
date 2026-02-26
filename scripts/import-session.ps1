# import-session.ps1 — Read the latest session summary from Google Drive
# Usage: pwsh scripts/import-session.ps1
# Usage: pwsh scripts/import-session.ps1 -List     (show all sessions)

param(
    [switch]$List
)

$driveBase = "G:\Mi unidad\ZeroCode\conversaciones"

if (-not (Test-Path $driveBase)) {
    Write-Host "`n❌ No se encontró la carpeta de sesiones en Google Drive." -ForegroundColor Red
    Write-Host "   Ruta esperada: $driveBase" -ForegroundColor DarkGray
    Write-Host "   ¿Tienes Google Drive for Desktop activo?" -ForegroundColor DarkGray
    exit 1
}

$sessions = Get-ChildItem $driveBase -Filter "*.md" | Sort-Object LastWriteTime -Descending

if ($sessions.Count -eq 0) {
    Write-Host "`n⚠️  No hay sesiones exportadas todavía." -ForegroundColor Yellow
    Write-Host "   Usa 'npm run export-session `"descripcion`"' para crear una." -ForegroundColor DarkGray
    exit 0
}

if ($List) {
    Write-Host "`n📋 Sesiones disponibles ($($sessions.Count)):`n" -ForegroundColor Cyan
    $i = 1
    foreach ($s in $sessions) {
        $date = $s.LastWriteTime.ToString("dd/MM/yyyy HH:mm")
        $name = $s.BaseName
        if ($i -eq 1) {
            Write-Host "  $i. $name  ($date)  ← más reciente" -ForegroundColor Green
        }
        else {
            Write-Host "  $i. $name  ($date)" -ForegroundColor White
        }
        $i++
    }
    Write-Host ""
}
else {
    $latest = $sessions[0]
    Write-Host "`n📄 Última sesión: $($latest.Name)" -ForegroundColor Cyan
    Write-Host "   Fecha: $($latest.LastWriteTime.ToString('dd/MM/yyyy HH:mm'))" -ForegroundColor DarkGray
    Write-Host "`n$("─" * 60)" -ForegroundColor DarkGray

    $content = Get-Content $latest.FullName -Raw -Encoding UTF8
    Write-Host $content

    Write-Host "$("─" * 60)" -ForegroundColor DarkGray
    Write-Host "`n💡 Para ver todas las sesiones: npm run import-session -- -List" -ForegroundColor Yellow
}
