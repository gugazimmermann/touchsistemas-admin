/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOwner = /* GraphQL */ `
  query GetOwner($id: ID!) {
    getOwner(id: $id) {
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
export const listOwners = /* GraphQL */ `
  query ListOwners(
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncOwners = /* GraphQL */ `
  query SyncOwners(
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOwners(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
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
  }
`;
export const syncClients = /* GraphQL */ `
  query SyncClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getPartner = /* GraphQL */ `
  query GetPartner($id: ID!) {
    getPartner(id: $id) {
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
export const listPartners = /* GraphQL */ `
  query ListPartners(
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPartners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPartners = /* GraphQL */ `
  query SyncPartners(
    $filter: ModelPartnerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPartners(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
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
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserInfos = /* GraphQL */ `
  query SyncUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
      }
      nextToken
      startedAt
    }
  }
`;
