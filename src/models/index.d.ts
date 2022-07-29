import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserInfoMetaData = {
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
  readonly name?: string | null;
  readonly phone?: string | null;
  readonly email: string;
  readonly website?: string | null;
  readonly zipCode?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly street?: string | null;
  readonly number?: string | null;
  readonly Owners?: (Owner | null)[] | null;
  readonly Events?: (Event | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Client, ClientMetaData>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client, ClientMetaData>) => MutableModel<Client, ClientMetaData> | void): Client;
}

export declare class Event {
  readonly id: string;
  readonly referralCode: string;
  readonly plan: string;
  readonly name: string;
  readonly website?: string | null;
  readonly email?: string | null;
  readonly zipCode: string;
  readonly state: string;
  readonly city: string;
  readonly street?: string | null;
  readonly number?: string | null;
  readonly description?: string | null;
  readonly dates?: string[] | null;
  readonly clientID: string;
  readonly Client?: Client | null;
  readonly partnerID: string;
  readonly Partner?: Partner | null;
  readonly Users?: (User | null)[] | null;
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

export declare class User {
  readonly id: string;
  readonly phone: string;
  readonly code: number;
  readonly confirmation?: string | null;
  readonly codeUsed?: string | null;
  readonly eventID: string;
  readonly Event?: Event | null;
  readonly userInfo?: UserInfo | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userUserInfoId?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class UserInfo {
  readonly id: string;
  readonly phone: string;
  readonly name: string;
  readonly email: string;
  readonly gender: string;
  readonly state: string;
  readonly city: string;
  readonly birthdate: string;
  readonly authorization: boolean;
  readonly User?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserInfo, UserInfoMetaData>);
  static copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo, UserInfoMetaData>) => MutableModel<UserInfo, UserInfoMetaData> | void): UserInfo;
}