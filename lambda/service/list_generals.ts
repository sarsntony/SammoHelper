import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export type ListGeneralsArguments = {
    server: string;
}

export async function listGenerals(listGeneralsArguments: ListGeneralsArguments) {
  console.log(`listGeneralsArguments: ${listGeneralsArguments}`);
  const client: DynamoDBClient = new DynamoDBClient({region: 'us-east-1'});
  const queryGeneralCommand = new QueryCommand({
    TableName: process.env.GENERAL_TABLE,
    ExpressionAttributeValues: {
      ":server": {
        "S": listGeneralsArguments.server
      }
    },
    KeyConditionExpression: "server = :server",
  });
  try {
    const data = await client.send(queryGeneralCommand);
    if (data.Items) {
      return data.Items.map((item) => unmarshall(item));
    }
    return [];
  } catch (err) {
    return err;
  }
}