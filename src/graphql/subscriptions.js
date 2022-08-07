/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner($filter: ModelSubscriptionOwnerFilterInput) {
    onCreateOwner(filter: $filter) {
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
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner($filter: ModelSubscriptionOwnerFilterInput) {
    onUpdateOwner(filter: $filter) {
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
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner($filter: ModelSubscriptionOwnerFilterInput) {
    onDeleteOwner(filter: $filter) {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient($filter: ModelSubscriptionClientFilterInput) {
    onCreateClient(filter: $filter) {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient($filter: ModelSubscriptionClientFilterInput) {
    onUpdateClient(filter: $filter) {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient($filter: ModelSubscriptionClientFilterInput) {
    onDeleteClient(filter: $filter) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreatePartner = /* GraphQL */ `
  subscription OnCreatePartner($filter: ModelSubscriptionPartnerFilterInput) {
    onCreatePartner(filter: $filter) {
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
export const onUpdatePartner = /* GraphQL */ `
  subscription OnUpdatePartner($filter: ModelSubscriptionPartnerFilterInput) {
    onUpdatePartner(filter: $filter) {
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
export const onDeletePartner = /* GraphQL */ `
  subscription OnDeletePartner($filter: ModelSubscriptionPartnerFilterInput) {
    onDeletePartner(filter: $filter) {
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
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey($filter: ModelSubscriptionSurveyFilterInput) {
    onCreateSurvey(filter: $filter) {
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
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey($filter: ModelSubscriptionSurveyFilterInput) {
    onUpdateSurvey(filter: $filter) {
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
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey($filter: ModelSubscriptionSurveyFilterInput) {
    onDeleteSurvey(filter: $filter) {
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
export const onCreateVisitor = /* GraphQL */ `
  subscription OnCreateVisitor($filter: ModelSubscriptionVisitorFilterInput) {
    onCreateVisitor(filter: $filter) {
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
export const onUpdateVisitor = /* GraphQL */ `
  subscription OnUpdateVisitor($filter: ModelSubscriptionVisitorFilterInput) {
    onUpdateVisitor(filter: $filter) {
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
export const onDeleteVisitor = /* GraphQL */ `
  subscription OnDeleteVisitor($filter: ModelSubscriptionVisitorFilterInput) {
    onDeleteVisitor(filter: $filter) {
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
