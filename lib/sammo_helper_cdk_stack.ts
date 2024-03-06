import { Duration, Expiration, Stack, StackProps } from 'aws-cdk-lib';
import { AuthorizationType, GraphqlApi, Resolver, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');

export class SammoHelperCdkStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const generalApi = new GraphqlApi(this, 'GeneralAPI', {
      name: 'General',
      schema: SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365)),
          },
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
    
    const generalHandler = new NodejsFunction(this, 'WidgetHandler', {
      runtime: Runtime.NODEJS_18_X,
      entry: './lambda/general_resolver.ts',
      handler: 'handler',
      environment: {
        GENERAL_TABLE: generalTable.tableName
      }
    });    
    generalTable.grantFullAccess(generalHandler);

    const generalLambdaDataSource = generalApi.addLambdaDataSource('generalLambdaDataSource', generalHandler);

    generalLambdaDataSource.createResolver('listGeneralsResolver', {
      typeName: 'Query',
      fieldName: 'listGenerals'
    });

    generalLambdaDataSource.createResolver('updateGeneralFromUserResolver', {
      typeName: 'Mutation',
      fieldName: 'updateGeneralFromUser'
    });
  }
}
