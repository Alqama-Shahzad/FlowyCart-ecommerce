# Manual Deployment to Netlify

If you're experiencing issues with the Netlify CLI or GitHub integration, you can deploy your FlowyCart application manually using Netlify's drag-and-drop interface.

## Step 1: Build Your Project

1. Make sure your project builds successfully locally:
   ```bash
   npm run build
   ```

2. This will create a `dist` folder containing your built application.

## Step 2: Deploy via Drag-and-Drop

1. Go to [Netlify](https://app.netlify.com/) and log in with your account.

2. From your Netlify dashboard, click on the "Sites" tab.

3. Drag and drop your entire `dist` folder onto the designated area that says "Drag and drop your site folder here".

4. Wait for the upload to complete. Netlify will automatically deploy your site and provide you with a unique URL.

## Step 3: Configure Redirects for SPA Routing

Since FlowyCart is a single-page application (SPA), you need to configure redirects to handle client-side routing:

1. After your site is deployed, go to your site's dashboard on Netlify.

2. Navigate to "Site settings" → "Build & deploy" → "Continuous deployment".

3. Scroll down to "Post processing" and click on "Add a redirect".

4. Add the following redirect rule:
   - From: `/*`
   - To: `/index.html`
   - Status: `200`

5. Click "Save".

## Step 4: Update Your Site (When Needed)

To update your site after making changes:

1. Build your project again with `npm run build`.

2. Go to your site's dashboard on Netlify.

3. Click on "Deploys" and then "Drag and drop your site folder here".

4. Drop the updated `dist` folder to deploy the new version.

## Step 5: Configure Custom Domain (Optional)

1. In your Netlify dashboard, go to your site settings.

2. Click on "Domain settings" or "Domain management".

3. Click on "Add custom domain" and follow the instructions to set up your custom domain.

---

This manual deployment method is useful when:
- You have limited disk space and can't install the Netlify CLI
- You're experiencing issues with GitHub integration
- You want a quick way to deploy without setting up continuous deployment

For a more automated workflow, consider setting up continuous deployment using GitHub once you have resolved any space or permission issues. 