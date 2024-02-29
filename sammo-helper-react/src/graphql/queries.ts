/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getGeneral = /* GraphQL */ `query GetGeneral($name: String!, $server: String!) {
  getGeneral(name: $name, server: $server) {
    action
    content
    country
    createdAt
    lastActions
    name
    server
    time
    unitClass
    unitType
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGeneralQueryVariables,
  APITypes.GetGeneralQuery
>;
export const listGenerals = /* GraphQL */ `query ListGenerals($server: String!) {
  listGenerals(server: $server) {
    action
    content
    country
    createdAt
    lastActions
    name
    server
    time
    unitClass
    unitType
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGeneralsQueryVariables,
  APITypes.ListGeneralsQuery
>;
