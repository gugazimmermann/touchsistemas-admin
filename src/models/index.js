// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Owner, Client, Event, Partner, EventsMap } = initSchema(schema);

export {
  Owner,
  Client,
  Event,
  Partner,
  EventsMap
};