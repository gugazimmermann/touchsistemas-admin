/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner {
    onCreateOwner {
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
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner {
    onUpdateOwner {
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
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner {
    onDeleteOwner {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreatePartner = /* GraphQL */ `
  subscription OnCreatePartner {
    onCreatePartner {
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
export const onUpdatePartner = /* GraphQL */ `
  subscription OnUpdatePartner {
    onUpdatePartner {
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
export const onDeletePartner = /* GraphQL */ `
  subscription OnDeletePartner {
    onDeletePartner {
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
export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey {
    onCreateSurvey {
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
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey {
    onUpdateSurvey {
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
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey {
    onDeleteSurvey {
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
export const onCreateVisitor = /* GraphQL */ `
  subscription OnCreateVisitor {
    onCreateVisitor {
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
export const onUpdateVisitor = /* GraphQL */ `
  subscription OnUpdateVisitor {
    onUpdateVisitor {
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
export const onDeleteVisitor = /* GraphQL */ `
  subscription OnDeleteVisitor {
    onDeleteVisitor {
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
