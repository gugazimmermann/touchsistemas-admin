/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        createdAt
        updatedAt
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
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
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
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
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
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
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
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
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
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
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
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
      gift
      giftDescription
      prizeDraw
      prizeDrawDescription
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
            gift
            giftDescription
            prizeDraw
            prizeDrawDescription
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
export const createPartner = /* GraphQL */ `
  mutation CreatePartner(
    $input: CreatePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    createPartner(input: $input, condition: $condition) {
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
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
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
      number
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
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
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
      number
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
          gift
          giftDescription
          prizeDraw
          prizeDrawDescription
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
      number
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
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
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
            maritalStatus
            disabledPerson
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
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
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
            maritalStatus
            disabledPerson
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
        gift
        giftDescription
        prizeDraw
        prizeDrawDescription
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
            maritalStatus
            disabledPerson
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
            maritalStatus
            disabledPerson
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
            maritalStatus
            disabledPerson
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
            maritalStatus
            disabledPerson
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
      createdAt
      updatedAt
    }
  }
`;
