import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { CreateGeneralInput, General, UpdateGeneralInput } from "../types";

const cleanUpObject = (object: Record<string, any>) => {
  for (let key in object) {
    if (object[key] === undefined || object[key] === 'undefined') {
      delete object[key];
    }
  }
}

const getUnitClassFromUnitType = (unitType: string) => {
  console.log(`unitType 1: ${unitType}`);
  if (!!unitType) {
    if (unitType == '보병' || 
        unitType == '청주병' || 
        unitType == '수병' || 
        unitType == '자객병' || 
        unitType == '근위병' || 
        unitType == '등갑병' || 
        unitType == '백이병') {
      return '보병';
    }

    if (unitType == '궁병' || 
        unitType == '궁기병' || 
        unitType == '연노병' || 
        unitType == '강궁병' || 
        unitType == '석궁병') {
      return '궁병';
    }

    if (unitType == '기병' || 
        unitType == '백마병' || 
        unitType == '중장기병' || 
        unitType == '돌격기병' || 
        unitType == '철기병' || 
        unitType == '수렵기병' || 
        unitType == '맹수병' || 
        unitType == '호표기병') {
      return '기병';
    }
    
    if (unitType == '귀병' || 
        unitType == '신귀병' || 
        unitType == '백귀병' || 
        unitType == '흑귀병' || 
        unitType == '악귀병' || 
        unitType == '남귀병' || 
        unitType == '황귀병' || 
        unitType == '천귀병' || 
        unitType == '마귀병') {
      return '귀병';
    }

    if (unitType == '정란' ||
        unitType == '충차' ||
        unitType == '벽력거' ||
        unitType == '목우') {
      return '차병';
    }
  }
  return '';
}

const updateGeneral = (general: General, updateGeneralFromUserArguments: CreateGeneralInput | UpdateGeneralInput) => {
  cleanUpObject(general);
  if (updateGeneralFromUserArguments.action) {
    general.action = updateGeneralFromUserArguments.action;
  }
  if (updateGeneralFromUserArguments.country) {
    general.country = updateGeneralFromUserArguments.country;
  }
  if (updateGeneralFromUserArguments.unitType) {
    general.unitType = updateGeneralFromUserArguments.unitType;
    general.unitClass = getUnitClassFromUnitType(updateGeneralFromUserArguments.unitType);
  }
  if (updateGeneralFromUserArguments.time) {
    if (general.time) {
      if (updateGeneralFromUserArguments.time < general.time) {
        general.time = updateGeneralFromUserArguments.time;            
      }
    } else {
      general.time = updateGeneralFromUserArguments.time;
    }
  }
}

export async function updateGeneralFromUser(updateGeneralFromUserArguments: CreateGeneralInput | UpdateGeneralInput) {
  console.log(`updateGeneralFromUserArguments: ${JSON.stringify(updateGeneralFromUserArguments)}`);
  const client = new DynamoDBClient({region: 'us-east-1'});
  cleanUpObject(updateGeneralFromUserArguments);  
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
      const general = unmarshall(getGeneralResult.Item) as General;
      updateGeneral(general, updateGeneralFromUserArguments);
      general.updatedAt = new Date().toISOString();
      const putGeneralCommand = new PutItemCommand({
        TableName: process.env.GENERAL_TABLE,
        Item: marshall(general)        
      });
      await client.send(putGeneralCommand)
      return general;
    } else {
      const general: General = updateGeneralFromUserArguments as General;
      general.createdAt = new Date().toISOString();
      general.updatedAt = new Date().toISOString();
      if (general.unitType) {
        general.unitClass = getUnitClassFromUnitType(general.unitType);
      }
      const putGeneralCommand = new PutItemCommand({
        TableName: process.env.GENERAL_TABLE,
        Item: marshall(general)        
      });
      await client.send(putGeneralCommand)
      return general;
    }
  } catch (err) {
    return err;
  }
}