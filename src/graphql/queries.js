/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlan = /* GraphQL */ `
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      type
      name
      detail
      price
      createdAt
      updatedAt
    }
  }
`;
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        name
        detail
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const plansByType = /* GraphQL */ `
  query PlansByType(
    $type: PlansTypes!
    $sortDirection: ModelSortDirection
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    plansByType(
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        name
        detail
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
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
        eventsMap
        subscriptionsMap
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      eventsMap
      subscriptionsMap
      Owners {
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        nextToken
      }
      Subscriptions {
        items {
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        eventsMap
        subscriptionsMap
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      nextToken
    }
  }
`;
export const clientsByEmail = /* GraphQL */ `
  query ClientsByEmail(
    $email: AWSEmail!
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
        eventsMap
        subscriptionsMap
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      nextToken
    }
  }
`;
export const clientsByState = /* GraphQL */ `
  query ClientsByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientsByState(
      state: $state
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        eventsMap
        subscriptionsMap
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      nextToken
    }
  }
`;
export const getSubscriptions = /* GraphQL */ `
  query GetSubscriptions($id: ID!) {
    getSubscriptions(id: $id) {
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
      clientID
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
        eventsMap
        subscriptionsMap
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      partnerID
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
        Events {
          items {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      Surveys {
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
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
          maritalStatus
          disabledPerson
          state
          city
          birthdate
          surveyAnswers
          EventID
          Event {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
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
      createdAt
      updatedAt
    }
  }
`;
export const listSubscriptions = /* GraphQL */ `
  query ListSubscriptions(
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const subscriptionsByState = /* GraphQL */ `
  query SubscriptionsByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByState(
      state: $state
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const subscriptionsByClientID = /* GraphQL */ `
  query SubscriptionsByClientID(
    $clientID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByClientID(
      clientID: $clientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const subscriptionsByPartnerID = /* GraphQL */ `
  query SubscriptionsByPartnerID(
    $partnerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByPartnerID(
      partnerID: $partnerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
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
      description
      dates
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
      clientID
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
        eventsMap
        subscriptionsMap
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      partnerID
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
        Events {
          items {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      Surveys {
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
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
          maritalStatus
          disabledPerson
          state
          city
          birthdate
          surveyAnswers
          EventID
          Event {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
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
        description
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByState = /* GraphQL */ `
  query EventsByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByState(
      state: $state
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        referralCode
        plan
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
        description
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
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
        description
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
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
        description
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
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
        items {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        nextToken
      }
      Subscriptions {
        items {
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        nextToken
      }
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
          items {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
          items {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
      nextToken
    }
  }
`;
export const partnersByState = /* GraphQL */ `
  query PartnersByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    partnersByState(
      state: $state
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          items {
            id
            referralCode
            plan
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
            description
            dates
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
            clientID
            partnerID
            createdAt
            updatedAt
          }
          nextToken
        }
        Subscriptions {
          items {
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
        description
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
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
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const surveysBySubscriptionsID = /* GraphQL */ `
  query SurveysBySubscriptionsID(
    $SubscriptionsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    surveysBySubscriptionsID(
      SubscriptionsID: $SubscriptionsID
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
      maritalStatus
      disabledPerson
      state
      city
      birthdate
      surveyAnswers
      EventID
      Event {
        id
        referralCode
        plan
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
        description
        dates
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
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
        clientID
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
        partnerID
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
          Events {
            nextToken
          }
          Subscriptions {
            nextToken
          }
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
            SubscriptionsID
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
            maritalStatus
            disabledPerson
            state
            city
            birthdate
            surveyAnswers
            EventID
            SubscriptionsID
            createdAt
            updatedAt
          }
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
        maritalStatus
        disabledPerson
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
    $eventDay: AWSDate!
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
        maritalStatus
        disabledPerson
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorsByPhoneAndEventID = /* GraphQL */ `
  query VisitorsByPhoneAndEventID(
    $phone: AWSPhone!
    $EventID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorsByPhoneAndEventID(
      phone: $phone
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
        maritalStatus
        disabledPerson
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
    $confirmation: AWSDateTime!
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
        maritalStatus
        disabledPerson
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        maritalStatus
        disabledPerson
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorsBySubscriptionsID = /* GraphQL */ `
  query VisitorsBySubscriptionsID(
    $SubscriptionsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorsBySubscriptionsID(
      SubscriptionsID: $SubscriptionsID
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
        maritalStatus
        disabledPerson
        state
        city
        birthdate
        surveyAnswers
        EventID
        Event {
          id
          referralCode
          plan
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
          description
          dates
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
          clientID
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
            eventsMap
            subscriptionsMap
            createdAt
            updatedAt
          }
          partnerID
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
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
