/* Amplify Params - DO NOT EDIT
	API_GENERAL_GENERALTABLE_ARN
	API_GENERAL_GENERALTABLE_NAME
	API_GENERAL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getGeneral(key) {
  const params = {
    TableName: process.env.API_GENERAL_GENERALTABLE_NAME,
    Key: key
  }
  try {
    const data = await docClient.get(params).promise()
    return data;
  } catch (err) {
    return err;
  }
}

async function putGeneral(item, createdAt, updatedAt) {
  const params = {
    TableName: process.env.API_GENERAL_GENERALTABLE_NAME,
    Item: item
  }
  try {
    const data = await docClient.put(params).promise()
    return data;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const key = {
    server: event.arguments.server,
    name: event.arguments.name,
  }
  let general = await getGeneral(key);
  console.log(`GENERAL: ${JSON.stringify(general)}`);

  if (!general.Item) {
    const item = {
      server: event.arguments.server,
      country: event.arguments.country,
      name: event.arguments.name,
      time: event.arguments.time,
      unitType: event.arguments.unitType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    let unitClass = getUnitClassFromUnitType(event.arguments.unitType);
    if (!!unitClass) {
      item.unitClass = unitClass;
    }
    let lastActions = appendAction('', event.arguments.yearMonth, event.arguments.action);
    if (!!lastActions) {
      item.lastActions = lastActions;
    }

    await putGeneral(item);
    return item;
  } else {
    let shouldUpdate = false;
    const existingGeneral = general.Item;
    if (!!event.arguments.time) { 
      if (!existingGeneral.time || event.arguments.time < existingGeneral.time) {
        existingGeneral.time = event.arguments.time;
        shouldUpdate = true;
      }
    }

    if (!!event.arguments.country) { 
      if (!existingGeneral.country || !event.arguments.country != existingGeneral.country) {
        existingGeneral.country = event.arguments.country;
        shouldUpdate = true;
      }
    }

    if (!!event.arguments.unitType) {
      if (!existingGeneral.unitType || event.arguments.unitType != existingGeneral.unitType) {
        existingGeneral.unitType = event.arguments.unitType;
        console.log(`unitType: ${event.arguments.unitType}`);
        let unitClass = getUnitClassFromUnitType(event.arguments.unitType);
        if (!!unitClass) {
          existingGeneral.unitClass = unitClass;
        }
        console.log(`unitClass: ${existingGeneral.unitClass}`);
        shouldUpdate = true;
      }
    }

    if (!!event.arguments.action) {
      let lastActions = appendAction(existingGeneral.lastActions, event.arguments.yearMonth, event.arguments.action);
      if (lastActions != existingGeneral.lastActions) {
        existingGeneral.lastActions = lastActions;
        shouldUpdate = true;
      }
    }
    if (shouldUpdate) {
      existingGeneral.updatedAt = new Date().toISOString();
      await putGeneral(existingGeneral);
    }
    return existingGeneral;
  }
};

const getUnitClassFromUnitType = (unitType) => {
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

const appendAction = (existingActions, yearMonth, action) => {
  if (!!action) {
    let actions = {};
    if (!!existingActions) {
      existingActionsObject = JSON.parse(existingActions);
      if (!!existingActionsObject[yearMonth]) {
        if (action.length > existingActionsObject[yearMonth].length) {
          existingActionsObject[yearMonth] = action;
        }
        actions = existingActionsObject;
      }
    } else {
      actions[yearMonth] = action;
    }
    return JSON.stringify(actions);
  }
  return '';
}
*/