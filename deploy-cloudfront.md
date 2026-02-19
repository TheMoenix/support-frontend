# Deploying with AWS CloudFront & Custom Domain

This guide walks you through setting up CloudFront CDN with HTTPS and a custom domain for your S3-hosted application.

## Prerequisites

- Completed S3 deployment (see [deploy-s3.md](./deploy-s3.md))
- AWS Account
- (Optional) A registered domain name

## Step 1: Request SSL Certificate from AWS Certificate Manager

1. Log in to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **Certificate Manager** (ACM)
3. **Important:** Switch to **US East (N. Virginia) us-east-1** region (required for CloudFront)
4. Click **Request certificate**
5. Select **Request a public certificate**
6. Click **Next**

### Configure Certificate:

7. Enter your domain name(s):
   - `yourdomain.com`
   - `*.yourdomain.com` (wildcard for subdomains)
8. Select **DNS validation** (recommended) or **Email validation**
9. Click **Request**

### Validate Certificate:

10. Click on your certificate ID
11. Click **Create records in Route 53** (if using Route53)
    - Or manually add the CNAME records to your DNS provider
12. Wait for status to change to **Issued** (usually 5-30 minutes)

## Step 2: Create CloudFront Distribution

1. Navigate to **CloudFront** service
2. Click **Create distribution**

### Origin Settings:

3. **Origin domain**: Select your S3 bucket from dropdown
   - Or manually enter: `YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com`
4. **Protocol**: Select **HTTP only** (S3 website endpoints don't support HTTPS)
5. **Name**: Auto-filled, keep default

### Default Cache Behavior:

6. **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**
7. **Allowed HTTP methods**: Select **GET, HEAD**
8. **Cache policy**: Select **CachingOptimized**
9. Leave other settings as default

### Settings:

10. **Price class**: Choose based on your needs
    - **Use all edge locations** (best performance)
    - Or select specific regions to reduce costs
11. **Alternate domain names (CNAMEs)**: Add your domain
    - `yourdomain.com`
    - `www.yourdomain.com`
12. **Custom SSL certificate**: Select the certificate you created in Step 1
13. **Default root object**: Enter `index.html`
14. Click **Create distribution**

### Note Distribution Details:

15. Wait for distribution status to change from **Deploying** to **Enabled** (10-20 minutes)
16. Copy the **Distribution domain name** (e.g., `d1234abcd.cloudfront.net`)

## Step 3: Configure Error Pages for SPA Routing

1. Go to your CloudFront distribution
2. Click on **Error pages** tab
3. Click **Create custom error response**

### For 403 Errors:

4. **HTTP error code**: 403
5. **Customize error response**: Yes
6. **Response page path**: `/index.html`
7. **HTTP response code**: 200
8. Click **Create custom error response**

### For 404 Errors:

9. Repeat steps 3-8, but select **HTTP error code**: 404

## Step 4: Create Route53 Records (For Custom Domain)

### If you don't have a hosted zone:

1. Navigate to **Route 53** service
2. Click **Hosted zones**
3. Click **Create hosted zone**
4. Enter your domain name
5. Click **Create hosted zone**
6. Note the **Name servers** and update them at your domain registrar

### Create A Record:

7. Click **Create record**
8. Leave **Record name** empty (for root domain) or enter `www` (for subdomain)
9. **Record type**: A
10. **Alias**: Toggle ON
11. **Route traffic to**:
    - Select **Alias to CloudFront distribution**
    - Select your distribution from dropdown
12. Click **Create records**

### Create Record for www (if needed):

13. Repeat steps 7-12, entering `www` as the record name

## Step 5: Update S3 Bucket Policy (Optional but Recommended)

For better security, restrict S3 bucket access to CloudFront only
