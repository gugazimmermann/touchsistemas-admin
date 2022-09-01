/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlan = /* GraphQL */ `
  query GetPlan($id: ID!, $active: String!) {
    getPlan(id: $id, active: $active) {
      id
      type
      name
      detail
      price
      frequency
      active
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
          logo
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
        nextToken
      }
      Events {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $id: ID
    $active: ModelStringKeyConditionInput
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPlans(
      id: $id
      active: $active
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        type
        name
        detail
        price
        frequency
        active
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
        Events {
          items {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const planByType = /* GraphQL */ `
  query PlanByType(
    $type: PlansTypes!
    $sortDirection: ModelSortDirection
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    planByType(
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
        frequency
        active
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
        Events {
          items {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const planByActive = /* GraphQL */ `
  query PlanByActive(
    $active: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    planByActive(
      active: $active
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
        frequency
        active
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
        Events {
          items {
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
          nextToken
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
      logo
      eventsMap
      subscriptionsMap
      Owners {
        items {
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
          logo
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
        logo
        eventsMap
        subscriptionsMap
        Owners {
          items {
            id
            name
            phone
            email
            ClientID
            createdAt
            updatedAt
          }
          nextToken
        }
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const clientByEmail = /* GraphQL */ `
  query ClientByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByEmail(
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
        logo
        eventsMap
        subscriptionsMap
        Owners {
          items {
            id
            name
            phone
            email
            ClientID
            createdAt
            updatedAt
          }
          nextToken
        }
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const clientByState = /* GraphQL */ `
  query ClientByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByState(
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
        logo
        eventsMap
        subscriptionsMap
        Owners {
          items {
            id
            name
            phone
            email
            ClientID
            createdAt
            updatedAt
          }
          nextToken
        }
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const getOwner = /* GraphQL */ `
  query GetOwner($id: ID!, $name: String!) {
    getOwner(id: $id, name: $name) {
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
        eventsMap
        subscriptionsMap
        Owners {
          items {
            id
            name
            phone
            email
            ClientID
            createdAt
            updatedAt
          }
          nextToken
        }
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
    $id: ID
    $name: ModelStringKeyConditionInput
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOwners(
      id: $id
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
export const ownerByEmail = /* GraphQL */ `
  query OwnerByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ownerByEmail(
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
export const getEvents = /* GraphQL */ `
  query GetEvents($id: ID!) {
    getEvents(id: $id) {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
        Events {
          items {
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
          nextToken
        }
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
        eventsMap
        subscriptionsMap
        Owners {
          items {
            id
            name
            phone
            email
            ClientID
            createdAt
            updatedAt
          }
          nextToken
        }
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
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
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
        nextToken
      }
      Visitors {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
      planEventsId
      planEventsActive
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      nextToken
    }
  }
`;
export const eventsByState = /* GraphQL */ `
  query EventsByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEventsFilterInput
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      nextToken
    }
  }
`;
export const eventsByPlanID = /* GraphQL */ `
  query EventsByPlanID(
    $PlanID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByPlanID(
      PlanID: $PlanID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      nextToken
    }
  }
`;
export const eventsByClientID = /* GraphQL */ `
  query EventsByClientID(
    $ClientID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByClientID(
      ClientID: $ClientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      nextToken
    }
  }
`;
export const eventsByPartnerID = /* GraphQL */ `
  query EventsByPartnerID(
    $PartnerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByPartnerID(
      PartnerID: $PartnerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planEventsId
        planEventsActive
      }
      nextToken
    }
  }
`;
export const getSubscriptions = /* GraphQL */ `
  query GetSubscriptions($id: ID!, $active: String!) {
    getSubscriptions(id: $id, active: $active) {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
        Events {
          items {
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
          nextToken
        }
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
        eventsMap
        subscriptionsMap
        Owners {
          items {
            id
            name
            phone
            email
            ClientID
            createdAt
            updatedAt
          }
          nextToken
        }
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
          }
          nextToken
        }
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
        Events {
          items {
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
        nextToken
      }
      Visitors {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
      planSubscriptionsId
      planSubscriptionsActive
    }
  }
`;
export const listSubscriptions = /* GraphQL */ `
  query ListSubscriptions(
    $id: ID
    $active: ModelStringKeyConditionInput
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSubscriptions(
      id: $id
      active: $active
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        logo
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
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
        logo
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      nextToken
    }
  }
`;
export const subscriptionsByActive = /* GraphQL */ `
  query SubscriptionsByActive(
    $active: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByActive(
      active: $active
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
        logo
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      nextToken
    }
  }
`;
export const subscriptionsByPlanID = /* GraphQL */ `
  query SubscriptionsByPlanID(
    $PlanID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByPlanID(
      PlanID: $PlanID
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
        logo
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      nextToken
    }
  }
`;
export const subscriptionsByClientID = /* GraphQL */ `
  query SubscriptionsByClientID(
    $ClientID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByClientID(
      ClientID: $ClientID
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
        logo
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      nextToken
    }
  }
`;
export const subscriptionsByPartnerID = /* GraphQL */ `
  query SubscriptionsByPartnerID(
    $PartnerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscriptionsByPartnerID(
      PartnerID: $PartnerID
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
        logo
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        planSubscriptionsId
        planSubscriptionsActive
      }
      nextToken
    }
  }
`;
export const getPartner = /* GraphQL */ `
  query GetPartner($id: ID!, $name: String!) {
    getPartner(id: $id, name: $name) {
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
          logo
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
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPartners = /* GraphQL */ `
  query ListPartners(
    $id: ID
    $name: ModelStringKeyConditionInput
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPartners(
      id: $id
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const partnerByReferralCode = /* GraphQL */ `
  query PartnerByReferralCode(
    $referralCode: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    partnerByReferralCode(
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const partnerByContact = /* GraphQL */ `
  query PartnerByContact(
    $contact: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    partnerByContact(
      contact: $contact
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const partnerByEmail = /* GraphQL */ `
  query PartnerByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    partnerByEmail(
      email: $email
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
export const partnerByState = /* GraphQL */ `
  query PartnerByState(
    $state: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    partnerByState(
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
            logo
            active
            PlanID
            ClientID
            PartnerID
            createdAt
            updatedAt
            planSubscriptionsId
            planSubscriptionsActive
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
  query GetSurvey($id: ID!, $order: Int!) {
    getSurvey(id: $id, order: $order) {
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
        Plan {
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
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
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $id: ID
    $order: ModelIntKeyConditionInput
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSurveys(
      id: $id
      order: $order
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const surveyByLanguage = /* GraphQL */ `
  query SurveyByLanguage(
    $language: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    surveyByLanguage(
      language: $language
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const surveyByEventsID = /* GraphQL */ `
  query SurveyByEventsID(
    $EventsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    surveyByEventsID(
      EventsID: $EventsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const surveyBySubscriptionsID = /* GraphQL */ `
  query SurveyBySubscriptionsID(
    $SubscriptionsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    surveyBySubscriptionsID(
      SubscriptionsID: $SubscriptionsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        Plan {
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
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
          Subscriptions {
            nextToken
          }
          Events {
            nextToken
          }
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
            language
            type
            required
            question
            answers
            EventsID
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Visitors {
          items {
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
            SubscriptionsID
            createdAt
            updatedAt
          }
          nextToken
        }
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
export const listVisitors = /* GraphQL */ `
  query ListVisitors(
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVisitors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorByDay = /* GraphQL */ `
  query VisitorByDay(
    $day: AWSDate!
    $eventsIDSubscriptionsID: ModelVisitorByDayCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorByDay(
      day: $day
      eventsIDSubscriptionsID: $eventsIDSubscriptionsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorByPhone = /* GraphQL */ `
  query VisitorByPhone(
    $phone: AWSPhone!
    $EventsID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorByPhone(
      phone: $phone
      EventsID: $EventsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorByConfirmation = /* GraphQL */ `
  query VisitorByConfirmation(
    $confirmation: AWSDateTime!
    $EventsID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorByConfirmation(
      confirmation: $confirmation
      EventsID: $EventsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorByEventsID = /* GraphQL */ `
  query VisitorByEventsID(
    $EventsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorByEventsID(
      EventsID: $EventsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const visitorBySubscriptionsID = /* GraphQL */ `
  query VisitorBySubscriptionsID(
    $SubscriptionsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVisitorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    visitorBySubscriptionsID(
      SubscriptionsID: $SubscriptionsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
