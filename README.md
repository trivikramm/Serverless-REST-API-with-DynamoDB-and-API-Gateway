# Serverless REST API with DynamoDB and API Gateway

This project is a complete serverless REST API to manage a simple to-do list. It is built using the AWS Cloud Development Kit (CDK) and features a backend powered by API Gateway, Lambda, and DynamoDB, with a static frontend hosted on S3.

## Architecture

The application follows a serverless, event-driven architecture. All resources are defined as infrastructure-as-code using the AWS CDK.

<img width="1210" height="458" alt="Screenshot 2025-08-16 194153" src="https://github.com/user-attachments/assets/827e118d-eda7-43c3-baee-17e2dbda2f22" />



1.  **Frontend**: A static website built with HTML, CSS, and JavaScript is hosted in an **Amazon S3 bucket**.
2.  **API**: **Amazon API Gateway** provides the REST endpoints for the frontend to interact with.
3.  **Backend Logic**: **AWS Lambda** functions contain the business logic for creating, reading, updating, and deleting to-do items. Each function is responsible for a single task.
4.  **Database**: **Amazon DynamoDB** is a fully managed NoSQL database used to store the to-do items.
5.  **Security**: **AWS IAM** roles are automatically created by the CDK to grant the necessary permissions for the Lambda functions to access the DynamoDB table.
6.  **Monitoring**: All logs from the Lambda functions are sent to **Amazon CloudWatch Logs**.

## Key Features

*   **Serverless**: No servers to manage. The application scales automatically.
*   **Infrastructure-as-Code**: All AWS resources are defined in TypeScript using the AWS CDK.
*   **REST API**: A full-featured API with CRUD (Create, Read, Update, Delete) operations.
*   **NoSQL Database**: Uses DynamoDB for flexible and scalable data storage.
*   **Static Website Hosting**: The frontend is hosted on S3 for low-cost and high-availability.

## Prerequisites

*   [AWS CLI](https://aws.amazon.com/cli/) configured with your credentials.
*   [Node.js](https://nodejs.org/en/) (v18.x or later).
*   [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) installed globally (`npm install -g aws-cdk`).

## Step-by-Step Deployment Guide

### 1. Clone the Repository

```bash
git clone https://github.com/trivikramm/Serverless-REST-API-with-DynamoDB-and-API-Gateway.git
cd Serverless-REST-API-with-DynamoDB-and-API-Gateway
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Bootstrap your AWS Environment

If this is your first time using the AWS CDK in this AWS account and region, you will need to bootstrap it. This command creates the necessary resources for the CDK to manage your deployments.

```bash
cdk bootstrap
```

### 4. Deploy the Stack

Deploy the application to your AWS account:

```bash
cdk deploy
```

The CDK will show you the resources that will be created and ask for your confirmation to proceed. After the deployment is complete, you will see the `ApiUrl` and `WebsiteUrl` in the output.

### 5. Update the API URL

Copy the `ApiUrl` from the output of the `cdk deploy` command and paste it into the `src/static/app.js` file:

```javascript
// src/static/app.js
const apiUrl = 'YOUR_API_URL'; // Replace with the ApiUrl from the CDK output
```

After updating the URL, you will need to redeploy the frontend assets. You can do this by running `cdk deploy` again.

## Using the Application

Open the `WebsiteUrl` from the CDK output in your browser. You can now add, view, and delete to-do items.

## Project Structure

```
.
├── bin/cdk.ts                # CDK App entry point
├── lib/cdk-stack.ts          # Main CDK Stack definition
├── src/
│   ├── handlers/             # Lambda function source code
│   │   ├── create.ts
│   │   ├── delete.ts
│   │   ├── get.ts
│   │   └── update.ts
│   └── static/               # Frontend assets
│       ├── app.js
│       ├── index.html
│       └── style.css
├── package.json
└── tsconfig.json
```

## Cleanup

To remove all the resources created by this project, run the following command:

```bash
cdk destroy
```
