// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SurveyTypes = {
  "SINGLE": "SINGLE",
  "MULTIPLE": "MULTIPLE"
};

const { Owner, Client, Event, Partner, Survey, Visitor } = initSchema(schema);

export {
  Owner,
  Client,
  Event,
  Partner,
  Survey,
  Visitor,
  SurveyTypes
};