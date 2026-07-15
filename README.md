# KS School Website

Next.js site for KS School of Business Management & Information Technology.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Push to GitHub

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Keep the detected framework as `Next.js`.
3. Leave the build command as `next build`.
4. Leave the output setting empty so Vercel uses the default Next.js runtime.
5. Deploy.

No extra `vercel.json` is required for the current setup.
