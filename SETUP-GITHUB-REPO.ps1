# One-time setup: create the GitHub repo in your browser, then this script pushes code + secrets.
# The fine-grained PAT in Git Credential Manager can push but cannot create repositories.

$ErrorActionPreference = "Stop"
$Repo = "bearllc555-spec/legally-site"
$RepoUrl = "https://github.com/$Repo.git"
$CreateUrl = "https://github.com/new?name=legally-site&description=Legally+boutique+law+firm+design+-+Cloudflare+Pages&visibility=public"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Opening GitHub repo create page (name pre-filled: legally-site)..." -ForegroundColor Cyan
Start-Process $CreateUrl

Write-Host "Create the empty repo in your browser, then come back here." -ForegroundColor Yellow
Write-Host "Waiting for https://github.com/$Repo ..." -ForegroundColor Yellow

$originUrl = git -C "$Root" remote get-url origin 2>$null
if ($originUrl -match 'x-access-token:([^@]+)@') {
  $pat = $Matches[1]
} else {
  $pat = (gh auth token).Trim()
}

$headers = @{ Authorization = "token $pat"; Accept = "application/vnd.github+json" }
$deadline = (Get-Date).AddMinutes(5)
while ((Get-Date) -lt $deadline) {
  try {
    Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo" -Headers $headers | Out-Null
    Write-Host "Repo found." -ForegroundColor Green
    break
  } catch {
    Start-Sleep -Seconds 3
  }
}

if ((Get-Date) -ge $deadline) {
  Write-Host "Timed out waiting for repo. Create it manually, then re-run this script." -ForegroundColor Red
  exit 1
}

Set-Location $Root
git remote remove origin 2>$null
git remote add origin "https://x-access-token:${pat}@github.com/$Repo.git"
git checkout dev
git push -u origin dev
git checkout main
git push -u origin main

$cfToken = (Get-Content "c:\Users\thede\OneDrive\Documents\Claude\slatepress\.local\cf-pages-token.txt" -Raw).Trim()
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Content -Path "$env:TEMP\gh-pat.txt" -Value $pat -NoNewline
Get-Content "$env:TEMP\gh-pat.txt" -Raw | gh auth login --with-token 2>$null
gh secret set CLOUDFLARE_API_TOKEN --repo $Repo --body $cfToken
gh secret set CLOUDFLARE_ACCOUNT_ID --repo $Repo --body "e0f6f68f26f8a26a75eaa793385019ef"

Write-Host "Done: https://github.com/$Repo" -ForegroundColor Green
Write-Host "GitHub Actions will deploy dev/main branch pushes to Cloudflare Pages." -ForegroundColor Green
