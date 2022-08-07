/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOwner = /* GraphQL */ `
  query GetOwner($id: ID!) {
    getOwner(id: $id) {
      id
      name
      phone
      email
      clientID
      Client {
        id
        name
        phone
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        eventsMap
        Owners {
          nextToken
        }
        Events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOwners = /* GraphQL */ `
  query ListOwners(
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        email
        clientID
        Client {
          id
          name
          phone
          email
          website
          zipCode
          state
          city
          street
          number
          complement
          eventsMap
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      phone
      email
      website
      zipCode
      state
      city
      street
      number
      complement
      eventsMap
      Owners {
        items {
          id
          name
          phone
          email
          clientID
          createdAt
          updatedAt
        }
        nextToken
      }
      Events {
        items {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        eventsMap
        Owners {
          nextToken
        }
        Events {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      referralCode
      plan
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      description
      dates
      clientID
      Client {
        id
        name
        phone
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        eventsMap
        Owners {
          nextToken
        }
        Events {
          nextToken
        }
        createdAt
        updatedAt
      }
      partnerID
      Partner {
        id
        name
        contact
        email
        phone
        referralCode
        zipCode
        state
        city
        street
        Events {
          nextToken
        }
        number
        createdAt
        updatedAt
      }
      Surveys {
        items {
          id
          order
          question
          type
          answers
          EventID
          createdAt
          updatedAt
        }
        nextToken
      }
      Visitors {
        items {
          id
          eventDay
          phone
          code
          confirmation
          codeUsed
          authorization
          name
          email
          gender
          state
          city
          birthdate
          surveyAnswers
          EventID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        referralCode
        plan
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        description
        dates
        clientID
        Client {
          id
          name
          phone
          email
          website
          zipCode
          state
          city
          street
          number
          complement
          eventsMap
          createdAt
          updatedAt
        }
        partnerID
        Partner {
          id
          name
          contact
          email
          phone
          referralCode
          zipCode
          state
          city
          street
          number
          createdAt
          updatedAt
        }
        Surveys {
          nextToken
        }
        Visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPartner = /* GraphQL */ `
  query GetPartner($id: ID!) {
    getPartner(id: $id) {
      id
      name
      contact
      email
      phone
      referralCode
      zipCode
      state
      city
      street
      Events {
        items {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        nextToken
      }
      number
      createdAt
      updatedAt
    }
  }
`;
export const listPartners = /* GraphQL */ `
  query ListPartners(
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPartners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        contact
        email
        phone
        referralCode
        zipCode
        state
        city
        street
        Events {
          nextToken
        }
        number
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSurvey = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
      id
      order
      question
      type
      answers
      EventID
      Event {
        id
        referralCode
        plan
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        description
        dates
        clientID
        Client {
          id
          name
          phone
          email
          website
          zipCode
          state
          city
          street
          number
          complement
          eventsMap
          createdAt
          updatedAt
        }
        partnerID
        Partner {
          id
          name
          contact
          email
          phone
          referralCode
          zipCode
          state
          city
          street
          number
          createdAt
          updatedAt
        }
        Surveys {
          nextToken
        }
        Visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        order
        question
        type
        answers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVisitor = /* GraphQL */ `
  query GetVisitor($id: ID!) {
    getVisitor(id: $id) {
      id
      eventDay
      phone
      code
      confirmation
      codeUsed
      authorization
      name
      email
      gender
      state
      city
      birthdate
      surveyAnswers
      EventID
      Event {
        id
        referralCode
        plan
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        description
        dates
        clientID
        Client {
          id
          name
          phone
          email
          website
          zipCode
          state
          city
          street
          number
          complement
          eventsMap
          createdAt
          updatedAt
        }
        partnerID
        Partner {
          id
          name
          contact
          email
          phone
          referralCode
          zipCode
          state
          city
          street
          number
          createdAt
          updatedAt
        }
        Surveys {
          nextToken
        }
        Visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listVisitors = /* GraphQL */ `
  query ListVisitors(
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVisitors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventDay
        phone
        code
        confirmation
        codeUsed
        authorization
        name
        email
        gender
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const clientsByEmail = /* GraphQL */ `
  query ClientsByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientsByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phone
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        eventsMap
        Owners {
          nextToken
        }
        Events {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByClientID = /* GraphQL */ `
  query EventsByClientID(
    $clientID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByClientID(
      clientID: $clientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        referralCode
        plan
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        description
        dates
        clientID
        Client {
          id
          name
          phone
          email
          website
          zipCode
          state
          city
          street
          number
          complement
          eventsMap
          createdAt
          updatedAt
        }
        partnerID
        Partner {
          id
          name
          contact
          email
          phone
          referralCode
          zipCode
          state
          city
          street
          number
          createdAt
          updatedAt
        }
        Surveys {
          nextToken
        }
        Visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByPartnerID = /* GraphQL */ `
  query EventsByPartnerID(
    $partnerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByPartnerID(
      partnerID: $partnerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        referralCode
        plan
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        description
        dates
        clientID
        Client {
          id
          name
          phone
          email
          website
          zipCode
          state
          city
          street
          number
          complement
          eventsMap
          createdAt
          updatedAt
        }
        partnerID
        Partner {
          id
          name
          contact
          email
          phone
          referralCode
          zipCode
          state
          city
          street
          number
          createdAt
          updatedAt
        }
        Surveys {
          nextToken
        }
        Visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const partnersByReferralCode = /* GraphQL */ `
  query PartnersByReferralCode(
    $referralCode: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    partnersByReferralCode(
      referralCode: $referralCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        contact
        email
        phone
        referralCode
        zipCode
        state
        city
        street
        Events {
          nextToken
        }
        number
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const surveysByQuestion = /* GraphQL */ `
  query SurveysByQuestion(
    $question: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    surveysByQuestion(
      question: $question
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        order
        question
        type
        answers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const surveysByEventID = /* GraphQL */ `
  query SurveysByEventID(
    $EventID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    surveysByEventID(
      EventID: $EventID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        order
        question
        type
        answers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorsByEventDayAndEventID = /* GraphQL */ `
  query VisitorsByEventDayAndEventID(
    $eventDay: String!
    $EventID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorsByEventDayAndEventID(
      eventDay: $eventDay
      EventID: $EventID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventDay
        phone
        code
        confirmation
        codeUsed
        authorization
        name
        email
        gender
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorsByConfirmationAndEventID = /* GraphQL */ `
  query VisitorsByConfirmationAndEventID(
    $confirmation: String!
    $EventID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorsByConfirmationAndEventID(
      confirmation: $confirmation
      EventID: $EventID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventDay
        phone
        code
        confirmation
        codeUsed
        authorization
        name
        email
        gender
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorsByEventID = /* GraphQL */ `
  query VisitorsByEventID(
    $EventID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorsByEventID(
      EventID: $EventID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventDay
        phone
        code
        confirmation
        codeUsed
        authorization
        name
        email
        gender
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
          name
          website
          email
          zipCode
          state
          city
          street
          number
          complement
          description
          dates
          clientID
          partnerID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
