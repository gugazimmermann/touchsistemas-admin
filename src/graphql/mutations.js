/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOwner = /* GraphQL */ `
  mutation CreateOwner(
    $input: CreateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    createOwner(input: $input, condition: $condition) {
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
        Owners {
          items {
            name
            phone
            email
            clientID
            id
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOwner = /* GraphQL */ `
  mutation UpdateOwner(
    $input: UpdateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    updateOwner(input: $input, condition: $condition) {
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
        Owners {
          items {
            name
            phone
            email
            clientID
            id
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOwner = /* GraphQL */ `
  mutation DeleteOwner(
    $input: DeleteOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    deleteOwner(input: $input, condition: $condition) {
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
        Owners {
          items {
            name
            phone
            email
            clientID
            id
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      Owners {
        items {
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      Owners {
        items {
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      Owners {
        items {
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Owners {
          items {
            name
            phone
            email
            clientID
            id
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        number
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Users {
        items {
          id
          phone
          code
          confirmation
          codeUsed
          eventID
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          userInfo {
            id
            phone
            name
            email
            gender
            state
            city
            birthdate
            authorization
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userInfoUserId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userUserInfoId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Owners {
          items {
            name
            phone
            email
            clientID
            id
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        number
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Users {
        items {
          id
          phone
          code
          confirmation
          codeUsed
          eventID
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          userInfo {
            id
            phone
            name
            email
            gender
            state
            city
            birthdate
            authorization
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userInfoUserId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userUserInfoId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Owners {
          items {
            name
            phone
            email
            clientID
            id
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        number
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Users {
        items {
          id
          phone
          code
          confirmation
          codeUsed
          eventID
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          userInfo {
            id
            phone
            name
            email
            gender
            state
            city
            birthdate
            authorization
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userInfoUserId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userUserInfoId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      number
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      number
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      number
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      phone
      code
      confirmation
      codeUsed
      eventID
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
          Owners {
            nextToken
            startedAt
          }
          Events {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
            startedAt
          }
          number
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Users {
          items {
            id
            phone
            code
            confirmation
            codeUsed
            eventID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userUserInfoId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userInfo {
        id
        phone
        name
        email
        gender
        state
        city
        birthdate
        authorization
        User {
          id
          phone
          code
          confirmation
          codeUsed
          eventID
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          userInfo {
            id
            phone
            name
            email
            gender
            state
            city
            birthdate
            authorization
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userInfoUserId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userUserInfoId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userUserInfoId
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      phone
      code
      confirmation
      codeUsed
      eventID
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
          Owners {
            nextToken
            startedAt
          }
          Events {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
            startedAt
          }
          number
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Users {
          items {
            id
            phone
            code
            confirmation
            codeUsed
            eventID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userUserInfoId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userInfo {
        id
        phone
        name
        email
        gender
        state
        city
        birthdate
        authorization
        User {
          id
          phone
          code
          confirmation
          codeUsed
          eventID
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          userInfo {
            id
            phone
            name
            email
            gender
            state
            city
            birthdate
            authorization
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userInfoUserId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userUserInfoId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userUserInfoId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      phone
      code
      confirmation
      codeUsed
      eventID
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
          Owners {
            nextToken
            startedAt
          }
          Events {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
            startedAt
          }
          number
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Users {
          items {
            id
            phone
            code
            confirmation
            codeUsed
            eventID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userUserInfoId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userInfo {
        id
        phone
        name
        email
        gender
        state
        city
        birthdate
        authorization
        User {
          id
          phone
          code
          confirmation
          codeUsed
          eventID
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
            description
            dates
            clientID
            partnerID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          userInfo {
            id
            phone
            name
            email
            gender
            state
            city
            birthdate
            authorization
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userInfoUserId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userUserInfoId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userUserInfoId
    }
  }
`;
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
      id
      phone
      name
      email
      gender
      state
      city
      birthdate
      authorization
      User {
        id
        phone
        code
        confirmation
        codeUsed
        eventID
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        userInfo {
          id
          phone
          name
          email
          gender
          state
          city
          birthdate
          authorization
          User {
            id
            phone
            code
            confirmation
            codeUsed
            eventID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userUserInfoId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userInfoUserId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userUserInfoId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userInfoUserId
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
      id
      phone
      name
      email
      gender
      state
      city
      birthdate
      authorization
      User {
        id
        phone
        code
        confirmation
        codeUsed
        eventID
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        userInfo {
          id
          phone
          name
          email
          gender
          state
          city
          birthdate
          authorization
          User {
            id
            phone
            code
            confirmation
            codeUsed
            eventID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userUserInfoId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userInfoUserId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userUserInfoId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userInfoUserId
    }
  }
`;
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
      id
      phone
      name
      email
      gender
      state
      city
      birthdate
      authorization
      User {
        id
        phone
        code
        confirmation
        codeUsed
        eventID
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
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          Users {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        userInfo {
          id
          phone
          name
          email
          gender
          state
          city
          birthdate
          authorization
          User {
            id
            phone
            code
            confirmation
            codeUsed
            eventID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userUserInfoId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userInfoUserId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userUserInfoId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userInfoUserId
    }
  }
`;
