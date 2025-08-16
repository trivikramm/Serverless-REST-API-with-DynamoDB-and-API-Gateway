import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  const { id } = event.pathParameters;

  const command = new DeleteCommand({
    TableName: process.env.TABLE_NAME,
    Key: { id },
  });

  await docClient.send(command);

  return {
    statusCode: 204,
    body: '',
  };
};
