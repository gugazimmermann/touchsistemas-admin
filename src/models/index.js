// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PlansTypes = {
  "BASIC": "BASIC",
  "ADVANCED": "ADVANCED",
  "SUBSCRIPTION": "SUBSCRIPTION"
};

const PlansFrequency = {
  "SINGLE": "SINGLE",
  "MONTHLY": "MONTHLY"
};

const SurveyTypes = {
  "SINGLE": "SINGLE",
  "MULTIPLE": "MULTIPLE",
  "TEXT": "TEXT",
  "MULTILINE": "MULTILINE"
};

const MethodTypes = {
  "SMS": "SMS",
  "EMAIL": "EMAIL",
  "NONE": "NONE"
};

const { Plan, Subscriptions, Client, Owner, Events, Partner, Survey, Visitor } = initSchema(schema);

export {
  Plan,
  Subscriptions,
  Client,
  Owner,
  Events,
  Partner,
  Survey,
  Visitor,
  PlansTypes,
  PlansFrequency,
  SurveyTypes,
  MethodTypes
};