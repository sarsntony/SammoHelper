import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export type UpdateGeneralFromUserArguments = {
    action: string;
    country: string;
    name: string;
    server: string;
    time: string;
    unitType: string;
    yearMonth: string;
}

const cleanUpObject = (object: Record<string, any>) => {
  for (let key in object) {
    if (object[key] === undefined) {
      delete object[key];
    }
  }
}

export async function updateGeneralFromUser(updateGeneralFromUserArguments: UpdateGeneralFromUserArguments) {
  cleanUpObject(updateGeneralFromUserArguments);

  const client = new DynamoDBClient({region: 'us-east-1'});
  
  console.log(`updateGeneralFromUserArguments: ${JSON.stringify(updateGeneralFromUserArguments)}`);
  const getGeneralCommand = new GetItemCommand({
    TableName: process.env.GENERAL_TABLE,
    Key: marshall({
      "server": updateGeneralFromUserArguments.server,
      "name": updateGeneralFromUserArguments.name
    }),
  });
  try {
    const getGeneralResult = await client.send(getGeneralCommand);
    if (getGeneralResult.Item) {
      const existingGeneral = unmarshall(getGeneralResult.Item);
      cleanUpObject(existingGeneral);
      const updatedGeneral = {...existingGeneral};
      if (updateGeneralFromUserArguments.action) {
        updatedGeneral.action = updateGeneralFromUserArguments.action;
      }
      if (updateGeneralFromUserArguments.country) {
        updatedGeneral.country = updateGeneralFromUserArguments.country;
      }
      if (updateGeneralFromUserArguments.unitType) {
        updatedGeneral.unitType = updateGeneralFromUserArguments.unitType;
      }
      if (updateGeneralFromUserArguments.time) {
        if (updatedGeneral.time) {
          if (updateGeneralFromUserArguments.time < updatedGeneral.time) {
            updatedGeneral.time = updateGeneralFromUserArguments.time;            
          }
        } else {
          updatedGeneral.time = updateGeneralFromUserArguments.time;
        }
      }
      const putGeneralCommand = new PutItemCommand({
        TableName: process.env.GENERAL_TABLE,
        Item: marshall(updatedGeneral)        
      });
      await client.send(putGeneralCommand)
      return updatedGeneral;

    } else {
      const putGeneralCommand = new PutItemCommand({
        TableName: process.env.GENERAL_TABLE,
        Item: marshall(updateGeneralFromUserArguments)        
      });
      await client.send(putGeneralCommand)
      return updateGeneralFromUserArguments;
    }
  } catch (err) {
    return err;
  }
}