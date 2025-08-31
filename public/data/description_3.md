This architecture illustrates a cloud-native system designed to create and manage a large number of independent websites under a shared domain (`bigdomain.com`). 

The solution is based on a **serverless** and **highly available** design to minimize operational overhead and reduce costs, while ensuring scalability and security. It serves two distinct web interfaces — a public client-facing application and a private CMS administration console — both running on the same architecture but separated by authentication and access control.

- -**Frontend** : Each site’s static assets are hosted on Amazon S3 and distributed globally through Amazon CloudFront, secured with Amazon ACM certificates. Subdomains are managed with Route 53.
- -**Backend** : Requests are routed via Amazon API Gateway, authenticated through Amazon Cognito, and processed by AWS Lambda functions. This serverless backend ensures automatic scaling and pay-per-use cost efficiency.
- -**Database** : Business and CMS data are stored in Amazon RDS with multi-AZ failover for high availability. AWS RDS Proxy handles the connections pooling from Lambdas and provides automatic failover. AWS Secrets Manager ensures secure credential rotation.
- -**Security** : The system is protected with AWS WAF at the CloudFront layer. Cognito manages user authentication and authorization, ensuring that only authorized administrators can access the CMS.
- This setup allows administrators to create, manage, and deploy new websites dynamically from the CMS, with each site isolated by subdomain but sharing a common, scalable backend infrastructure.


**Improvement Path:**

**Cost Optimization** – Evaluate whether DynamoDB could replace part of the RDS workload to reduce database costs at scale.

**Advanced Security** – Enforce WAF rules for DDoS and bot protection, integrate AWS Shield for enhanced resilience.

**Multi-Region Resilience** – Extend the design to support active-active or active-passive failover across AWS regions for disaster recovery.