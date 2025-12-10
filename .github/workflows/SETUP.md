# Automated Deployment Setup

## Quick Setup (3 steps)

### 1. Get Vercel Tokens
```bash
npm i -g vercel
vercel login
vercel link
```

This creates `.vercel/project.json` with your IDs.

### 2. Get Vercel Token
- Go to https://vercel.com/account/tokens
- Create new token
- Copy the token


### 3. Add GitHub Secrets
Go to: `GitHub Repo → Settings → Secrets → Actions → New secret`

Add these 3 secrets:
- `VERCEL_TOKEN` - Token from step 2
- `VERCEL_ORG_ID` - From `.vercel/project.json`
- `VERCEL_PROJECT_ID` - From `.vercel/project.json`

## Done!
Push to main branch → Auto-deploys to Vercel ✓
