# Deploying FlowyCart to Netlify

This guide will walk you through the steps to deploy your FlowyCart React application to Netlify.

## Prerequisites

- A GitHub account
- Your FlowyCart project pushed to a GitHub repository
- A Netlify account (free tier is sufficient)

## Step 1: Prepare Your Project

1. Make sure your project builds successfully locally:
   ```bash
   npm run build
   ```

2. Ensure you have a `netlify.toml` file in your project root with the following content:
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. Commit and push these changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push
   ```

## Step 2: Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended)

1. Go to [Netlify](https://app.netlify.com/) and log in with your account.

2. Click on the "New site from Git" button.

3. Select "GitHub" as your Git provider and authorize Netlify to access your GitHub account if prompted.

4. Select your FlowyCart repository from the list.

5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

6. Click on "Advanced build settings" and add any environment variables if needed.

7. Click "Deploy site" to start the deployment process.

8. Wait for the build to complete. Netlify will provide you with a unique URL for your deployed site.

### Option 2: Deploy via Netlify CLI

If you have the Netlify CLI installed, you can deploy using:

```bash
# Login to Netlify
npx netlify login

# Initialize a new Netlify site
npx netlify init

# Deploy your site
npx netlify deploy --prod
```

## Step 3: Configure Custom Domain (Optional)

1. In your Netlify dashboard, go to your site settings.

2. Click on "Domain settings" or "Domain management".

3. Click on "Add custom domain" and follow the instructions to set up your custom domain.

## Step 4: Enable HTTPS (Automatic)

Netlify automatically provisions SSL certificates for all sites, including those with custom domains. No action is required from your side.

## Troubleshooting

### Build Failures

If your build fails on Netlify, check the build logs for errors. Common issues include:

- Missing dependencies
- TypeScript errors
- Environment variable issues

### Routing Issues

If you encounter routing issues (404 errors when refreshing pages), ensure your `netlify.toml` file is correctly configured with the redirect rule.

### Performance Optimization

To improve your site's performance on Netlify:

1. Enable asset optimization in your site settings
2. Consider using Netlify's image optimization features
3. Set up proper caching headers for static assets

## Continuous Deployment

Netlify automatically rebuilds and deploys your site when you push changes to your connected GitHub repository. No additional configuration is needed for continuous deployment.

---

Your FlowyCart application should now be successfully deployed on Netlify! If you encounter any issues, refer to [Netlify's documentation](https://docs.netlify.com/) or reach out to their support. 