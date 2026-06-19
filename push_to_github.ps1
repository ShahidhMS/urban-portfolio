Write-Host "==========================================" -ForegroundColor Green
Write-Host "   Automated Portfolio GitHub Uploader    " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Verify if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed or not in your system PATH." -ForegroundColor Red
    Write-Host "Please download and install Git from: https://git-scm.com/" -ForegroundColor Yellow
    Write-Host "After installing Git, restart your terminal and run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    Exit
}

# Ask for the repository URL
$repoUrl = Read-Host "Enter your GitHub Repository URL (e.g., https://github.com/username/repo-name.git)"
$repoUrl = $repoUrl.Trim()

if (-not $repoUrl) {
    Write-Host "Error: Repository URL is required." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    Exit
}

# Initialize and push
Write-Host "`nInitializing git repository..." -ForegroundColor Cyan
git init

Write-Host "Staging files..." -ForegroundColor Cyan
git add .

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "Configure automated GitHub Pages deployment"

Write-Host "Setting default branch to main..." -ForegroundColor Cyan
git branch -M main

# Check if origin already exists and remove it to avoid errors
if (git remote | Select-String "origin") {
    git remote remove origin
}

Write-Host "Adding remote origin: $repoUrl..." -ForegroundColor Cyan
git remote add origin $repoUrl

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main -f

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "SUCCESS: Code pushed to GitHub successfully!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to your repository settings page on GitHub." -ForegroundColor White
Write-Host "2. Select 'Pages' in the left menu." -ForegroundColor White
Write-Host "3. Under 'Source', select 'GitHub Actions'." -ForegroundColor White
Write-Host "Your site will be built and published automatically!" -ForegroundColor Green
Write-Host "`n"

Read-Host "Press Enter to exit"
