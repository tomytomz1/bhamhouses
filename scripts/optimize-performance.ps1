# BHAM Houses - Performance Optimization Script
Write-Host "🚀 Optimizing BHAM Houses performance..." -ForegroundColor Green

# Stop the dev server if running
Write-Host "Stopping development server..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean Next.js cache
Write-Host "Cleaning Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "✅ .next folder cleaned" -ForegroundColor Green
}

# Clean node_modules cache
Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Reinstall dependencies
Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
npm install

# Create .gitignore entries for performance
Write-Host "Updating .gitignore for performance..." -ForegroundColor Yellow
$gitignoreContent = @"
# Performance optimizations
.next/
node_modules/
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent

Write-Host "✅ Performance optimization complete!" -ForegroundColor Green
Write-Host "🎯 Now run: npm run dev" -ForegroundColor Cyan 