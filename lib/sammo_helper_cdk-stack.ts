import * as cdk from 'aws-cdk-lib';
import { AuthorizationType, GraphqlApi, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import path = require('path');

export class SammoHelperCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new GraphqlApi(this, 'SammoHelperAPI', {
      name: 'General',
      schema: SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    const generalTable = new Table(this, 'GeneralTable', {
      tableName: 'General',
      partitionKey: {
        name: 'server',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'name',
        type: AttributeType.STRING
      }
    });
  }
}
