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
