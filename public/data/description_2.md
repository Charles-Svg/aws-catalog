This webiste architecture was design to be the simpliest to build and deploy. Since it is only front-end code for now it is using **Amplify Hosting**, which is now recommended insted of regular S3 website hosting.

The front end is developped in React with Vite. The build files are uploaded in the **source code S3**. Amplify reads this bucket to copy the code in the internal managed S3 bucket and deploy the site with Cloudfront. 

The domain has been bought with **Route53** and SSL certificates are provisioned and managed by **AWS Certificate Manager (ACM)** via amplify hosting.

- **Improvement Path:**
- Enable CD by connecting the GitHub repository directly to Amplify Hosting. This would automate the build and deployment process via AWS CodeBuild.
- We could also use Github Actions to build the project, upload artifacts to the source  S3 bucket and trigger the deployment via Amplify CLI.
- For future backend needs we would use the serverless approach with Lambda and DynamoDB. 
*This could allow to implement a comment section directly on the architectures !*  
- For Security a WAF must be added 
