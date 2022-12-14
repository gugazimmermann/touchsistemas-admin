/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlan = /* GraphQL */ `
  subscription OnCreatePlan {
    onCreatePlan {
      id
      type
      name
      detail
      price
      frequency
      active
      Subscriptions {
        nextToken
      }
      Events {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlan = /* GraphQL */ `
  subscription OnUpdatePlan {
    onUpdatePlan {
      id
      type
      name
      detail
      price
      frequency
      active
      Subscriptions {
        nextToken
      }
      Events {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlan = /* GraphQL */ `
  subscription OnDeletePlan {
    onDeletePlan {
      id
      type
      name
      detail
      price
      frequency
      active
      Subscriptions {
        nextToken
      }
      Events {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
      id
      name
      phone
      doctype
      document
      email
      website
      zipCode
      state
      city
      street
      number
      complement
      logo
      map
      eventsMap
      subscriptionsMap
      Owners {
        nextToken
      }
      Events {
        nextToken
      }
      Subscriptions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
      id
      name
      phone
      doctype
      document
      email
      website
      zipCode
      state
      city
      street
      number
      complement
      logo
      map
      eventsMap
      subscriptionsMap
      Owners {
        nextToken
      }
      Events {
        nextToken
      }
      Subscriptions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
      id
      name
      phone
      doctype
      document
      email
      website
      zipCode
      state
      city
      street
      number
      complement
      logo
      map
      eventsMap
      subscriptionsMap
      Owners {
        nextToken
      }
      Events {
        nextToken
      }
      Subscriptions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner {
    onCreateOwner {
      id
      name
      phone
      email
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner {
    onUpdateOwner {
      id
      name
      phone
      email
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner {
    onDeleteOwner {
      id
      name
      phone
      email
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvents = /* GraphQL */ `
  subscription OnCreateEvents {
    onCreateEvents {
      id
      referralCode
      method
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      logo
      dates
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
      PlanID
      Plan {
        id
        type
        name
        detail
        price
        frequency
        active
        createdAt
        updatedAt
      }
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      PartnerID
      Partner {
        id
        referralCode
        name
        contact
        email
        phone
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
      planEventsId
      planEventsActive
    }
  }
`;
export const onUpdateEvents = /* GraphQL */ `
  subscription OnUpdateEvents {
    onUpdateEvents {
      id
      referralCode
      method
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      logo
      dates
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
      PlanID
      Plan {
        id
        type
        name
        detail
        price
        frequency
        active
        createdAt
        updatedAt
      }
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      PartnerID
      Partner {
        id
        referralCode
        name
        contact
        email
        phone
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
      planEventsId
      planEventsActive
    }
  }
`;
export const onDeleteEvents = /* GraphQL */ `
  subscription OnDeleteEvents {
    onDeleteEvents {
      id
      referralCode
      method
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      logo
      dates
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
      PlanID
      Plan {
        id
        type
        name
        detail
        price
        frequency
        active
        createdAt
        updatedAt
      }
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      PartnerID
      Partner {
        id
        referralCode
        name
        contact
        email
        phone
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
      planEventsId
      planEventsActive
    }
  }
`;
export const onCreateSubscriptions = /* GraphQL */ `
  subscription OnCreateSubscriptions {
    onCreateSubscriptions {
      id
      referralCode
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      logo
      map
      active
      PlanID
      Plan {
        id
        type
        name
        detail
        price
        frequency
        active
        createdAt
        updatedAt
      }
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      PartnerID
      Partner {
        id
        referralCode
        name
        contact
        email
        phone
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
      planSubscriptionsId
      planSubscriptionsActive
    }
  }
`;
export const onUpdateSubscriptions = /* GraphQL */ `
  subscription OnUpdateSubscriptions {
    onUpdateSubscriptions {
      id
      referralCode
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      logo
      map
      active
      PlanID
      Plan {
        id
        type
        name
        detail
        price
        frequency
        active
        createdAt
        updatedAt
      }
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      PartnerID
      Partner {
        id
        referralCode
        name
        contact
        email
        phone
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
      planSubscriptionsId
      planSubscriptionsActive
    }
  }
`;
export const onDeleteSubscriptions = /* GraphQL */ `
  subscription OnDeleteSubscriptions {
    onDeleteSubscriptions {
      id
      referralCode
      name
      website
      email
      zipCode
      state
      city
      street
      number
      complement
      logo
      map
      active
      PlanID
      Plan {
        id
        type
        name
        detail
        price
        frequency
        active
        createdAt
        updatedAt
      }
      ClientID
      Client {
        id
        name
        phone
        doctype
        document
        email
        website
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        eventsMap
        subscriptionsMap
        createdAt
        updatedAt
      }
      PartnerID
      Partner {
        id
        referralCode
        name
        contact
        email
        phone
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
      planSubscriptionsId
      planSubscriptionsActive
    }
  }
`;
export const onCreatePartner = /* GraphQL */ `
  subscription OnCreatePartner {
    onCreatePartner {
      id
      referralCode
      name
      contact
      email
      phone
      zipCode
      state
      city
      street
      number
      Events {
        nextToken
      }
      Subscriptions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePartner = /* GraphQL */ `
  subscription OnUpdatePartner {
    onUpdatePartner {
      id
      referralCode
      name
      contact
      email
      phone
      zipCode
      state
      city
      street
      number
      Events {
        nextToken
      }
      Subscriptions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePartner = /* GraphQL */ `
  subscription OnDeletePartner {
    onDeletePartner {
      id
      referralCode
      name
      contact
      email
      phone
      zipCode
      state
      city
      street
      number
      Events {
        nextToken
      }
      Subscriptions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey {
    onCreateSurvey {
      id
      order
      language
      type
      required
      question
      answers
      EventsID
      Events {
        id
        referralCode
        method
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      SubscriptionsID
      Subscriptions {
        id
        referralCode
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        active
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey {
    onUpdateSurvey {
      id
      order
      language
      type
      required
      question
      answers
      EventsID
      Events {
        id
        referralCode
        method
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      SubscriptionsID
      Subscriptions {
        id
        referralCode
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        active
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey {
    onDeleteSurvey {
      id
      order
      language
      type
      required
      question
      answers
      EventsID
      Events {
        id
        referralCode
        method
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      SubscriptionsID
      Subscriptions {
        id
        referralCode
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        active
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVisitor = /* GraphQL */ `
  subscription OnCreateVisitor {
    onCreateVisitor {
      id
      day
      phone
      code
      confirmation
      codeUsed
      authorization
      name
      email
      gender
      maritalStatus
      disabledPerson
      state
      city
      birthdate
      surveyAnswers
      EventsID
      Events {
        id
        referralCode
        method
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      SubscriptionsID
      Subscriptions {
        id
        referralCode
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        active
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVisitor = /* GraphQL */ `
  subscription OnUpdateVisitor {
    onUpdateVisitor {
      id
      day
      phone
      code
      confirmation
      codeUsed
      authorization
      name
      email
      gender
      maritalStatus
      disabledPerson
      state
      city
      birthdate
      surveyAnswers
      EventsID
      Events {
        id
        referralCode
        method
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      SubscriptionsID
      Subscriptions {
        id
        referralCode
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        active
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVisitor = /* GraphQL */ `
  subscription OnDeleteVisitor {
    onDeleteVisitor {
      id
      day
      phone
      code
      confirmation
      codeUsed
      authorization
      name
      email
      gender
      maritalStatus
      disabledPerson
      state
      city
      birthdate
      surveyAnswers
      EventsID
      Events {
        id
        referralCode
        method
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      SubscriptionsID
      Subscriptions {
        id
        referralCode
        name
        website
        email
        zipCode
        state
        city
        street
        number
        complement
        logo
        map
        active
        PlanID
        ClientID
        PartnerID
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      createdAt
      updatedAt
    }
  }
`;
