# Serverless REST API with DynamoDB and API Gateway

This project demonstrates how to build a serverless REST API using AWS CDK, API Gateway, Lambda, and DynamoDB.

## Architecture

The architecture consists of the following components:

*   **Amazon API Gateway:** Exposes a REST API with endpoints for CRUD operations.
*   **AWS Lambda:** Contains the business logic for handling API requests and interacting with DynamoDB.
*   **Amazon DynamoDB:** A NoSQL database for storing data.
*   **AWS CDK:** Used to define and deploy the infrastructure as code.
*   **Amazon S3:** Hosts the static frontend of the application.

## Getting Started

### Prerequisites

*   AWS CLI configured with your credentials.
*   Node.js and npm installed.
*   AWS CDK installed (`npm install -g aws-cdk`).

### Deployment

1.  Clone the repository.
2.  Install the dependencies: `npm install`.
3.  Deploy the stack: `cdk deploy`.

After deployment, the API Gateway endpoint URL will be displayed in the output. You can use this URL to interact with the API.
