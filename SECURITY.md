# Security Guide

## Environment Variables Setup

⚠️ **IMPORTANT:** Never commit `.env` files to version control!

### Step 1: Copy `.env.example` to `.env`

```bash
cp backend/.env.example backend/.env
```

### Step 2: Fill in your credentials

Edit `backend/.env` with your actual values:

```
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password
```

### Step 3: Obtain Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Paste into `MAIL_PASS` in `.env`

### Step 4: Protect Your Credentials

- **Never push `.env` to Git**
- Add to `.gitignore` if not already present
- Share credentials securely (1Password, LastPass, etc.)
- Rotate credentials if accidentally exposed

## GitHub Secret Detection

If secrets are detected in your repository:

1. **Immediately rotate all exposed credentials**
2. Remove secrets from commit history:
   ```bash
   git filter-branch --tree-filter 'rm -f backend/.env' HEAD
   git push --force origin main
   ```
3. Add `.env` to `.gitignore` before pushing again

## Best Practices

✅ **DO:**
- Use environment variables for all secrets
- Keep `.env` files locally only
- Rotate credentials regularly
- Use service-specific passwords (Gmail app passwords, database-specific tokens)
- Document setup process in `.env.example`

❌ **DON'T:**
- Commit `.env` files to version control
- Hardcode secrets in source code
- Share credentials in chat or email
- Use the same password for multiple services
- Skip setting up `.gitignore`

## Production Deployment

For production, use your hosting provider's secret management:
- Vercel: Environment Variables in Dashboard
- Heroku: Config Vars
- AWS: Secrets Manager
- Azure: Key Vault

Never expose secrets in your Git repository.
