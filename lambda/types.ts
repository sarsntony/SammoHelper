export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: any; output: any; }
  AWSDateTime: { input: any; output: any; }
  AWSEmail: { input: any; output: any; }
  AWSIPAddress: { input: any; output: any; }
  AWSJSON: { input: any; output: any; }
  AWSPhone: { input: any; output: any; }
  AWSTime: { input: any; output: any; }
  AWSTimestamp: { input: any; output: any; }
  AWSURL: { input: any; output: any; }
};

export type CreateGeneralInput = {
  action: InputMaybe<Scalars['String']['input']>;
  content: InputMaybe<Scalars['String']['input']>;
  country: InputMaybe<Scalars['String']['input']>;
  lastActions: InputMaybe<Scalars['AWSJSON']['input']>;
  name: Scalars['String']['input'];
  server: Scalars['String']['input'];
  time: InputMaybe<Scalars['String']['input']>;
  unitClass: InputMaybe<Scalars['String']['input']>;
  unitType: InputMaybe<Scalars['String']['input']>;
};

export type DeleteGeneralInput = {
  name: Scalars['String']['input'];
  server: Scalars['String']['input'];
};

export type General = {
  action: Maybe<Scalars['String']['output']>;
  content: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  lastActions: Maybe<Scalars['AWSJSON']['output']>;
  name: Scalars['String']['output'];
  server: Scalars['String']['output'];
  time: Maybe<Scalars['String']['output']>;
  unitClass: Maybe<Scalars['String']['output']>;
  unitType: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Mutation = {
  createGeneral: Maybe<General>;
  deleteGeneral: Maybe<General>;
  updateGeneral: Maybe<General>;
  updateGeneralFromUser: Maybe<General>;
};


export type MutationcreateGeneralArgs = {
  input: CreateGeneralInput;
};


export type MutationdeleteGeneralArgs = {
  input: DeleteGeneralInput;
};


export type MutationupdateGeneralArgs = {
  input: UpdateGeneralInput;
};


export type MutationupdateGeneralFromUserArgs = {
  action: InputMaybe<Scalars['String']['input']>;
  country: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  server: Scalars['String']['input'];
  time: InputMaybe<Scalars['String']['input']>;
  unitType: InputMaybe<Scalars['String']['input']>;
  yearMonth: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  getGeneral: Maybe<General>;
  listGenerals: Maybe<Array<Maybe<General>>>;
};


export type QuerygetGeneralArgs = {
  name: Scalars['String']['input'];
  server: Scalars['String']['input'];
};


export type QuerylistGeneralsArgs = {
  server: Scalars['String']['input'];
};

export type UpdateGeneralInput = {
  action: InputMaybe<Scalars['String']['input']>;
  content: InputMaybe<Scalars['String']['input']>;
  country: InputMaybe<Scalars['String']['input']>;
  lastActions: InputMaybe<Scalars['AWSJSON']['input']>;
  name: Scalars['String']['input'];
  server: Scalars['String']['input'];
  time: InputMaybe<Scalars['String']['input']>;
  unitClass: InputMaybe<Scalars['String']['input']>;
  unitType: InputMaybe<Scalars['String']['input']>;
};
