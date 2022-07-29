/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOwner = /* GraphQL */ `
	subscription OnCreateOwner($filter: ModelSubscriptionOwnerFilterInput) {
		onCreateOwner(filter: $filter) {
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
	}
`;
export const onUpdateOwner = /* GraphQL */ `
	subscription OnUpdateOwner($filter: ModelSubscriptionOwnerFilterInput) {
		onUpdateOwner(filter: $filter) {
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
	}
`;
export const onDeleteOwner = /* GraphQL */ `
	subscription OnDeleteOwner($filter: ModelSubscriptionOwnerFilterInput) {
		onDeleteOwner(filter: $filter) {
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
	}
`;
export const onCreateClient = /* GraphQL */ `
	subscription OnCreateClient($filter: ModelSubscriptionClientFilterInput) {
		onCreateClient(filter: $filter) {
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
	}
`;
export const onUpdateClient = /* GraphQL */ `
	subscription OnUpdateClient($filter: ModelSubscriptionClientFilterInput) {
		onUpdateClient(filter: $filter) {
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
	}
`;
export const onDeleteClient = /* GraphQL */ `
	subscription OnDeleteClient($filter: ModelSubscriptionClientFilterInput) {
		onDeleteClient(filter: $filter) {
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
	}
`;
export const onCreateEvent = /* GraphQL */ `
	subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
		onCreateEvent(filter: $filter) {
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
	}
`;
export const onUpdateEvent = /* GraphQL */ `
	subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
		onUpdateEvent(filter: $filter) {
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
	}
`;
export const onDeleteEvent = /* GraphQL */ `
	subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
		onDeleteEvent(filter: $filter) {
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
	}
`;
export const onCreatePartner = /* GraphQL */ `
	subscription OnCreatePartner($filter: ModelSubscriptionPartnerFilterInput) {
		onCreatePartner(filter: $filter) {
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
	}
`;
export const onUpdatePartner = /* GraphQL */ `
	subscription OnUpdatePartner($filter: ModelSubscriptionPartnerFilterInput) {
		onUpdatePartner(filter: $filter) {
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
	}
`;
export const onDeletePartner = /* GraphQL */ `
	subscription OnDeletePartner($filter: ModelSubscriptionPartnerFilterInput) {
		onDeletePartner(filter: $filter) {
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
	}
`;
export const onCreateUser = /* GraphQL */ `
	subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
		onCreateUser(filter: $filter) {
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
	}
`;
export const onUpdateUser = /* GraphQL */ `
	subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
		onUpdateUser(filter: $filter) {
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
	}
`;
export const onDeleteUser = /* GraphQL */ `
	subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
		onDeleteUser(filter: $filter) {
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
	}
`;
export const onCreateUserInfo = /* GraphQL */ `
	subscription OnCreateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
		onCreateUserInfo(filter: $filter) {
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
	}
`;
export const onUpdateUserInfo = /* GraphQL */ `
	subscription OnUpdateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
		onUpdateUserInfo(filter: $filter) {
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
	}
`;
export const onDeleteUserInfo = /* GraphQL */ `
	subscription OnDeleteUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
		onDeleteUserInfo(filter: $filter) {
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
	}
`;
