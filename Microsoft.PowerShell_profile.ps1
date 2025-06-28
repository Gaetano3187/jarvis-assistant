# --- carica automaticamente .env.local se esiste ---
if (Test-Path ".env.local") {
    Get-Content ".env.local" |
      Where-Object { $_ -match '^\s*\w' } |
      ForEach-Object {
          $k, $v = $_ -split '=', 2
          $Env:$k = $v.Trim('"')
      }
}
# ---------------------------------------------------
