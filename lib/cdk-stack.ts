import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Items', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const createHandler = new lambda.Function(this, 'CreateItemHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src/handlers'),
      handler: 'create.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const getHandler = new lambda.Function(this, 'GetItemHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src/handlers'),
      handler: 'get.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const updateHandler = new lambda.Function(this, 'UpdateItemHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src/handlers'),
      handler: 'update.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const deleteHandler = new lambda.Function(this, 'DeleteItemHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src/handlers'),
      handler: 'delete.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(createHandler);
    table.grantReadData(getHandler);
    table.grantReadWriteData(updateHandler);
    table.grantReadWriteData(deleteHandler);

    const api = new apigateway.RestApi(this, 'items-api', {
      restApiName: 'Items Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const items = api.root.addResource('items');
    items.addMethod('POST', new apigateway.LambdaIntegration(createHandler));
    const item = items.addResource('{id}');
    item.addMethod('GET', new apigateway.LambdaIntegration(getHandler));
    item.addMethod('PUT', new apigateway.LambdaIntegration(updateHandler));
    item.addMethod('DELETE', new apigateway.LambdaIntegration(deleteHandler));

    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./src/static')],
      destinationBucket: websiteBucket,
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
    });

    new cdk.CfnOutput(this, 'WebsiteUrl', {
        value: websiteBucket.bucketWebsiteUrl,
    });
  }
}
