import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum SurveyTypes {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE"
}



type OwnerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PartnerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SurveyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VisitorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Owner {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly clientID: string;
  readonly Client?: Client | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Owner, OwnerMetaData>);
  static copyOf(source: Owner, mutator: (draft: MutableModel<Owner, OwnerMetaData>) => MutableModel<Owner, OwnerMetaData> | void): Owner;
}

export declare class Client {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly website?: string | null;
  readonly zipCode: string;
  readonly state: string;
  readonly city: string;
  readonly street?: string | null;
  readonly number?: string | null;
  readonly complement?: string | null;
  readonly eventsMap?: number | null;
  readonly Owners?: (Owner | null)[] | null;
  readonly Events?: (Event | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Client, ClientMetaData>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client, ClientMetaData>) => MutableModel<Client, ClientMetaData> | void): Client;
}

export declare class Event {
  readonly id: string;
  readonly referralCode?: string | null;
  readonly plan: string;
  readonly name: string;
  readonly website?: string | null;
  readonly email?: string | null;
  readonly zipCode: string;
  readonly state: string;
  readonly city: string;
  readonly street?: string | null;
  readonly number?: string | null;
  readonly complement?: string | null;
  readonly description?: string | null;
  readonly dates: string[];
  readonly clientID: string;
  readonly Client?: Client | null;
  readonly partnerID?: string | null;
  readonly Partner?: Partner | null;
  readonly Surveys?: (Survey | null)[] | null;
  readonly Visitors?: (Visitor | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Event, EventMetaData>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}

export declare class Partner {
  readonly id: string;
  readonly name: string;
  readonly contact: string;
  readonly email: string;
  readonly phone: string;
  readonly referralCode: string;
  readonly zipCode: string;
  readonly state: string;
  readonly city: string;
  readonly street?: string | null;
  readonly Events?: (Event | null)[] | null;
  readonly number?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Partner, PartnerMetaData>);
  static copyOf(source: Partner, mutator: (draft: MutableModel<Partner, PartnerMetaData>) => MutableModel<Partner, PartnerMetaData> | void): Partner;
}

export declare class Survey {
  readonly id: string;
  readonly order: number;
  readonly question: string;
  readonly type: SurveyTypes | keyof typeof SurveyTypes;
  readonly answers: string;
  readonly EventID: string;
  readonly Event?: Event | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Survey, SurveyMetaData>);
  static copyOf(source: Survey, mutator: (draft: MutableModel<Survey, SurveyMetaData>) => MutableModel<Survey, SurveyMetaData> | void): Survey;
}

export declare class Visitor {
  readonly id: string;
  readonly eventDay: string;
  readonly phone: string;
  readonly code: number;
  readonly confirmation?: string | null;
  readonly codeUsed?: string | null;
  readonly authorization?: boolean | null;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly gender?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly birthdate?: string | null;
  readonly surveyAnswers: string;
  readonly EventID: string;
  readonly Event?: Event | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Visitor, VisitorMetaData>);
  static copyOf(source: Visitor, mutator: (draft: MutableModel<Visitor, VisitorMetaData>) => MutableModel<Visitor, VisitorMetaData> | void): Visitor;
}