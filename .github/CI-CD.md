# CI/CD Pipeline Documentation

## Overview
This repository uses GitHub Actions for automated build and deployment to Cloudflare Pages.

## Workflow: Build & Deploy

**File:** `.github/workflows/build-deploy.yml`

### Triggers
- Push to `main` branch
- Manual workflow dispatch

### Steps

1. **Checkout repository** - Clones the repository code
2. **Build artifacts** - Prepares static site files:
   - Copies `index.html` to `dist/`
   - Copies `assets/` directory to `dist/assets/`
   - Generates build metadata with timestamp, commit SHA, and branch
3. **Upload build artifacts** - Stores build output as GitHub Actions artifacts (30-day retention)
4. **Upload build logs** - Stores build metadata separately for easy access
5. **Publish to Cloudflare Pages** - Deploys the `dist/` directory to Cloudflare Pages
6. **Deployment summary** - Adds a summary to the GitHub Actions run

### Cloudflare Pages Integration

The workflow uses the official `cloudflare/pages-action@v1` to deploy to Cloudflare Pages.

#### Required Secrets
The following GitHub repository secrets must be configured:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages:Edit permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

#### Setup Instructions

1. **Get Cloudflare Account ID:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Copy your Account ID from the dashboard

2. **Create API Token:**
   - Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template
   - Add "Cloudflare Pages:Edit" permission
   - Copy the generated token

3. **Add Secrets to GitHub:**
   - Go to repository Settings > Secrets and variables > Actions
   - Add `CLOUDFLARE_API_TOKEN` with your API token
   - Add `CLOUDFLARE_ACCOUNT_ID` with your account ID

### Build Artifacts

Build artifacts are available for 30 days and include:
- **build-artifacts-{SHA}**: Complete build output (index.html + assets/)
- **build-logs-{SHA}**: Build metadata and information

### Accessing Deploy Logs

Deploy logs are accessible in multiple ways:

1. **GitHub Actions UI**: Navigate to Actions tab > Select workflow run
2. **Build artifacts**: Download from the workflow run page
3. **Job summary**: View deployment summary in the workflow run
4. **Cloudflare Dashboard**: View deployment logs in Cloudflare Pages project

### Edge Compatibility

This setup is optimized for Cloudflare Pages/Workers edge deployment:
- Static HTML, CSS, and JavaScript (no build step required)
- Fast global edge distribution
- Zero server-side processing
- Instant cache invalidation on deploy

### Local Testing

To test the build locally:

```bash
# Create dist directory
mkdir -p dist

# Copy files
cp index.html dist/
cp -r assets dist/

# Serve locally (requires a local server)
python3 -m http.server 8000 --directory dist
# or
npx serve dist
```

Then open http://localhost:8000 in your browser.

## Troubleshooting

**Deployment fails with authentication error:**
- Verify `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are set correctly
- Ensure API token has Pages:Edit permissions

**Build artifacts not appearing:**
- Check the workflow run completed successfully
- Artifacts are only retained for 30 days

**Cloudflare deployment succeeds but site not updated:**
- Check Cloudflare Pages dashboard for deployment status
- Verify the `projectName` in workflow matches your Cloudflare Pages project
- Clear browser cache or test in incognito mode
