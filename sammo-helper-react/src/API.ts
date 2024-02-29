/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGeneralInput = {
  action?: string | null,
  content?: string | null,
  country?: string | null,
  lastActions?: string | null,
  name: string,
  server: string,
  time?: string | null,
  unitClass?: string | null,
  unitType?: string | null,
};

export type General = {
  __typename: "General",
  action?: string | null,
  content?: string | null,
  country?: string | null,
  createdAt: string,
  lastActions?: string | null,
  name: string,
  server: string,
  time?: string | null,
  unitClass?: string | null,
  unitType?: string | null,
  updatedAt: string,
};

export type DeleteGeneralInput = {
  name: string,
  server: string,
};

export type UpdateGeneralInput = {
  action?: string | null,
  content?: string | null,
  country?: string | null,
  lastActions?: string | null,
  name: string,
  server: string,
  time?: string | null,
  unitClass?: string | null,
  unitType?: string | null,
};

export type CreateGeneralMutationVariables = {
  input: CreateGeneralInput,
};

export type CreateGeneralMutation = {
  createGeneral?:  {
    __typename: "General",
    action?: string | null,
    content?: string | null,
    country?: string | null,
    createdAt: string,
    lastActions?: string | null,
    name: string,
    server: string,
    time?: string | null,
    unitClass?: string | null,
    unitType?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteGeneralMutationVariables = {
  input: DeleteGeneralInput,
};

export type DeleteGeneralMutation = {
  deleteGeneral?:  {
    __typename: "General",
    action?: string | null,
    content?: string | null,
    country?: string | null,
    createdAt: string,
    lastActions?: string | null,
    name: string,
    server: string,
    time?: string | null,
    unitClass?: string | null,
    unitType?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateGeneralMutationVariables = {
  input: UpdateGeneralInput,
};

export type UpdateGeneralMutation = {
  updateGeneral?:  {
    __typename: "General",
    action?: string | null,
    content?: string | null,
    country?: string | null,
    createdAt: string,
    lastActions?: string | null,
    name: string,
    server: string,
    time?: string | null,
    unitClass?: string | null,
    unitType?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateGeneralFromUserMutationVariables = {
  action?: string | null,
  country?: string | null,
  name: string,
  server: string,
  time?: string | null,
  unitType?: string | null,
  yearMonth?: string | null,
};

export type UpdateGeneralFromUserMutation = {
  updateGeneralFromUser?:  {
    __typename: "General",
    action?: string | null,
    content?: string | null,
    country?: string | null,
    createdAt: string,
    lastActions?: string | null,
    name: string,
    server: string,
    time?: string | null,
    unitClass?: string | null,
    unitType?: string | null,
    updatedAt: string,
  } | null,
};

export type GetGeneralQueryVariables = {
  name: string,
  server: string,
};

export type GetGeneralQuery = {
  getGeneral?:  {
    __typename: "General",
    action?: string | null,
    content?: string | null,
    country?: string | null,
    createdAt: string,
    lastActions?: string | null,
    name: string,
    server: string,
    time?: string | null,
    unitClass?: string | null,
    unitType?: string | null,
    updatedAt: string,
  } | null,
};

export type ListGeneralsQueryVariables = {
  server: string,
};

export type ListGeneralsQuery = {
  listGenerals?:  Array< {
    __typename: "General",
    action?: string | null,
    content?: string | null,
    country?: string | null,
    createdAt: string,
    lastActions?: string | null,
    name: string,
    server: string,
    time?: string | null,
    unitClass?: string | null,
    unitType?: string | null,
    updatedAt: string,
  } | null > | null,
};
