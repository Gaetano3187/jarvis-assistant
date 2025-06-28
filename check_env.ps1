$envFile = ".env.local"
$log = "env_check_report.txt"
$expectedVars = @(
    "OPENAI_API_KEY",
    "ASSISTANT_ID",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_JWT_SECRET",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY"
)

if (-Not (Test-Path $envFile)) {
    Write-Host "❌ File $envFile non trovato"
    exit 1
}

$envContent = Get-Content $envFile
"`n📋 Controllo file $envFile - $(Get-Date)" | Out-File $log

foreach ($var in $expectedVars) {
    if ($envContent -match "$var=") {
        "✅ $var presente" | Tee-Object -FilePath $log -Append
    } else {
        "❌ $var mancante" | Tee-Object -FilePath $log -Append
    }
}

Write-Host "✅ Controllo completato. Vedi file $log"
