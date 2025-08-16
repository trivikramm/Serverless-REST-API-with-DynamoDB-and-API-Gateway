import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  const { id } = event.pathParameters;
  const { name, description } = JSON.parse(event.body);

  const command = new UpdateCommand({
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: "set #n = :n, #d = :d",
    ExpressionAttributeNames: {
      "#n": "name",
      "#d": "description",
    },
    ExpressionAttributeValues: {
      ":n": name,
      ":d": description,
    },
    ReturnValues: "ALL_NEW",
  });

  const { Attributes } = await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(Attributes),
  };
};
