# Deploying to AWS S3

This guide walks you through deploying your frontend application to Amazon S3.

## Prerequisites

- AWS Account
- AWS CLI installed and configured (or use AWS Console)

## Step 1: Build the Application

Run the build command to create production-ready files:

```bash
npm run build
```

This creates a `dist` folder with optimized static files.

## Step 2: Create an S3 Bucket

1. Log in to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **S3** service
3. Click **Create bucket**
4. Enter a unique bucket name (e.g., `support-frontend-app`), it has to be globally unique across all AWS accounts
5. Select your preferred AWS Region
6. **Uncheck** "Block all public access" (required for public website)
7. Acknowledge the warning about public access
8. Click **Create bucket**

## Step 3: Enable Static Website Hosting

1. Open your bucket
2. Go to the **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Select **Enable**
6. Set **Index document** to `index.html`
7. Set **Error document** to `index.html` (for SPA routing)
8. Click **Save changes**
9. Note the **Bucket website endpoint** URL

## Step 4: Configure Bucket Policy

1. Go to the **Permissions** tab
2. Scroll to **Bucket policy**
3. Click **Edit**
4. Paste the following policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

5. Click **Save changes**

## Step 5: Upload Files

### Option A: Using AWS Console

1. Go to the **Objects** tab in your bucket
2. Click **Upload**
3. Click **Add files** or **Add folder**
4. Select all files from the `dist` folder
5. Click **Upload**

### Option B: Using AWS CLI

```bash
aws s3 sync dist/ s3://YOUR-BUCKET-NAME --delete
```

The `--delete` flag removes files in S3 that aren't in your local `dist` folder.

## Step 6: Access Your Application

Visit the **Bucket website endpoint** URL from Step 3. Your application should now be live!

Example: `http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com`

## Updating Your Deployment

To deploy updates:

1. Make changes to your code
2. Run `npm run build`
3. Upload files again using Console or CLI
