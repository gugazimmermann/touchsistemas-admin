/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQLAPI_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { default as fetch, Request } from 'node-fetch';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient({ region: process.env.REGION });

const GRAPHQL_ENDPOINT = process.env.API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
	mutation CREATE_VISITOR($input: CreateVisitorInput!) {
		createVisitor(input: $input) {
			id
			createdAt
		}
	}
`;

function generateRandomNumber(minm, maxm) {
	return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

async function getEvent(eventID) {
	let response = {};
	try {
		const input = {
			AttributesToGet: ['id', 'dates', 'name'],
			TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQLAPI_EVENTTABLE_NAME,
			Key: { id: { S: eventID } },
		};
		const command = new GetItemCommand(input);
		response = await client.send(command);
	} catch (error) {
		console.log(error);
	}
	let event = {
		id: response['Item']['id']['S'],
		name: response['Item']['name']['S'],
		dates: response['Item']['dates']['L'].map((d) => d['S']),
	};
	return event;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	const eventBody = event?.body ? JSON.parse(event.body) : { eventID: null, phone: null };
	const eventID = eventBody.eventID;
	const phone = eventBody.phone;
	const code = generateRandomNumber(100000, 999999);

	console.log(`ID: ${eventID}`);
	console.log(`PHONE: ${phone}`);
	console.log(`CODE: ${code}`);

	if (eventID) {
		const event = await getEvent(eventID);
		console.log(`EVENT: ${event}`);

		if (event.id) {
			const variables = {
				input: {
					EventID: eventID,
					eventDay: '2022-08-05',
					phone: phone,
					code: code,
				},
			};

			/** @type {import('node-fetch').RequestInit} */
			const options = {
				method: 'POST',
				headers: {
					'x-api-key': GRAPHQL_API_KEY,
				},
				body: JSON.stringify({ query, variables }),
			};

			const request = new Request(GRAPHQL_ENDPOINT, options);

			let statusCode = 200;
			let body;
			let response;

			try {
				response = await fetch(request);
				body = await response.json();
				if (body.errors) statusCode = 400;
			} catch (error) {
				statusCode = 400;
				body = {
					errors: [
						{
							status: response.status,
							message: error.message,
							stack: error.stack,
						},
					],
				};
			}

			return {
				statusCode,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
				},
				body: JSON.stringify(body.data.createVisitor),
			};
		} else {
			throw new Error('NO EVENT');
		}
	} else {
		throw new Error('NO ID');
	}
};
