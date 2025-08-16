import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  const { id } = event.pathParameters;

  const command = new GetCommand({
    TableName: process.env.TABLE_NAME,
    Key: { id },
  });

  const { Item } = await docClient.send(command);

  if (!Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Item not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(Item),
  };
};
