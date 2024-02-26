const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

export type ListGeneralsArguments = {
    server: string;
}

export async function listGenerals(listGeneralsArguments: ListGeneralsArguments) {
    console.log(`listGeneralsArguments: ${listGeneralsArguments}`);
    const params = {
      TableName: process.env.GENERAL_TABLE,
      Key: listGeneralsArguments.server
    }
    try {
      const data = await docClient.get(params).promise()
      return data;
    } catch (err) {
      return err;
    }
  }