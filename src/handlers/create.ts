import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  const { name, description } = JSON.parse(event.body);
  const id = randomUUID();

  const command = new PutCommand({
    TableName: process.env.TABLE_NAME,
    Item: { id, name, description },
  });

  await docClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify({ id, name, description }),
  };
};
