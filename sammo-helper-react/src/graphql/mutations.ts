/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createGeneral = /* GraphQL */ `mutation CreateGeneral($input: CreateGeneralInput!) {
  createGeneral(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateGeneralMutationVariables,
  APITypes.CreateGeneralMutation
>;
export const deleteGeneral = /* GraphQL */ `mutation DeleteGeneral($input: DeleteGeneralInput!) {
  deleteGeneral(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteGeneralMutationVariables,
  APITypes.DeleteGeneralMutation
>;
export const updateGeneral = /* GraphQL */ `mutation UpdateGeneral($input: UpdateGeneralInput!) {
  updateGeneral(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateGeneralMutationVariables,
  APITypes.UpdateGeneralMutation
>;
export const updateGeneralFromUser = /* GraphQL */ `mutation UpdateGeneralFromUser(
  $action: String
  $country: String
  $name: String!
  $server: String!
  $time: String
  $unitType: String
  $yearMonth: String
) {
  updateGeneralFromUser(
    action: $action
    country: $country
    name: $name
    server: $server
    time: $time
    unitType: $unitType
    yearMonth: $yearMonth
  ) {
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
` as GeneratedMutation<
  APITypes.UpdateGeneralFromUserMutationVariables,
  APITypes.UpdateGeneralFromUserMutation
>;
