// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SurveyTypes = {
  "SINGLE": "SINGLE",
  "MULTIPLE": "MULTIPLE"
};

const MethodTypes = {
  "SMS": "SMS",
  "EMAIL": "EMAIL"
};

const PlansTypes = {
  "BASIC": "BASIC",
  "ADVANCED": "ADVANCED",
  "SUBSCRIPTION": "SUBSCRIPTION"
};

const { Plan, Owner, Client, Event, Partner, Subscriptions, Survey, Visitor } = initSchema(schema);

export {
  Plan,
  Owner,
  Client,
  Event,
  Partner,
  Subscriptions,
  Survey,
  Visitor,
  SurveyTypes,
  MethodTypes,
  PlansTypes
};