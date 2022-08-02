/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner {
    onCreateOwner {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner {
    onUpdateOwner {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner {
    onDeleteOwner {
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
      id
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
          }
          id
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
          }
          id
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
          }
          id
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
          }
          nextToken
        }
        number
        createdAt
        updatedAt
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
          }
          nextToken
        }
        number
        createdAt
        updatedAt
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
          }
          nextToken
        }
        number
        createdAt
        updatedAt
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
