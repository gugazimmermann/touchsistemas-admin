/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlan = /* GraphQL */ `
  mutation CreatePlan(
    $input: CreatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    createPlan(input: $input, condition: $condition) {
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
export const updatePlan = /* GraphQL */ `
  mutation UpdatePlan(
    $input: UpdatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    updatePlan(input: $input, condition: $condition) {
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
export const deletePlan = /* GraphQL */ `
  mutation DeletePlan(
    $input: DeletePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    deletePlan(input: $input, condition: $condition) {
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
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createOwner = /* GraphQL */ `
  mutation CreateOwner(
    $input: CreateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    createOwner(input: $input, condition: $condition) {
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
export const updateOwner = /* GraphQL */ `
  mutation UpdateOwner(
    $input: UpdateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    updateOwner(input: $input, condition: $condition) {
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
export const deleteOwner = /* GraphQL */ `
  mutation DeleteOwner(
    $input: DeleteOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    deleteOwner(input: $input, condition: $condition) {
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
export const createEvents = /* GraphQL */ `
  mutation CreateEvents(
    $input: CreateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    createEvents(input: $input, condition: $condition) {
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
          type
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
export const updateEvents = /* GraphQL */ `
  mutation UpdateEvents(
    $input: UpdateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    updateEvents(input: $input, condition: $condition) {
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
          type
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
export const deleteEvents = /* GraphQL */ `
  mutation DeleteEvents(
    $input: DeleteEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    deleteEvents(input: $input, condition: $condition) {
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
          type
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
export const createSubscriptions = /* GraphQL */ `
  mutation CreateSubscriptions(
    $input: CreateSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    createSubscriptions(input: $input, condition: $condition) {
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
          type
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
export const updateSubscriptions = /* GraphQL */ `
  mutation UpdateSubscriptions(
    $input: UpdateSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    updateSubscriptions(input: $input, condition: $condition) {
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
          type
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
export const deleteSubscriptions = /* GraphQL */ `
  mutation DeleteSubscriptions(
    $input: DeleteSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    deleteSubscriptions(input: $input, condition: $condition) {
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
          type
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
export const createPartner = /* GraphQL */ `
  mutation CreatePartner(
    $input: CreatePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    createPartner(input: $input, condition: $condition) {
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
export const updatePartner = /* GraphQL */ `
  mutation UpdatePartner(
    $input: UpdatePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    updatePartner(input: $input, condition: $condition) {
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
export const deletePartner = /* GraphQL */ `
  mutation DeletePartner(
    $input: DeletePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    deletePartner(input: $input, condition: $condition) {
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
export const createSurvey = /* GraphQL */ `
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
      id
      order
      type
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
            type
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
            type
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
export const updateSurvey = /* GraphQL */ `
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
      id
      order
      type
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
            type
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
            type
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
export const deleteSurvey = /* GraphQL */ `
  mutation DeleteSurvey(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
      id
      order
      type
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
            type
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
            type
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
export const createVisitor = /* GraphQL */ `
  mutation CreateVisitor(
    $input: CreateVisitorInput!
    $condition: ModelVisitorConditionInput
  ) {
    createVisitor(input: $input, condition: $condition) {
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
            type
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
            type
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
export const updateVisitor = /* GraphQL */ `
  mutation UpdateVisitor(
    $input: UpdateVisitorInput!
    $condition: ModelVisitorConditionInput
  ) {
    updateVisitor(input: $input, condition: $condition) {
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
            type
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
            type
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
export const deleteVisitor = /* GraphQL */ `
  mutation DeleteVisitor(
    $input: DeleteVisitorInput!
    $condition: ModelVisitorConditionInput
  ) {
    deleteVisitor(input: $input, condition: $condition) {
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
            type
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
            type
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
