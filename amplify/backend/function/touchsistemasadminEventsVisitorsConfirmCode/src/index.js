/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIKEYOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_VISITORTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_VISITORTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import moment from 'file:///opt/nodejs/node_modules/moment/moment.js';
import { default as fetch, Request } from 'file:///opt/nodejs/node_modules/node-fetch/src/index.js';
import {
	DynamoDBClient,
	GetItemCommand,
} from 'file:///opt/nodejs/node_modules/@aws-sdk/client-dynamodb/dist-cjs/index.js';

const client = new DynamoDBClient({ region: process.env.REGION });

const GRAPHQL_ENDPOINT = process.env.API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
	mutation UPDATE_VISITOR($input: UpdateVisitorInput!) {
		updateVisitor(input: $input) {
			id
			phone
			code
			confirmation
			updatedAt
		}
	}
`;

async function getEvent(eventID) {
	let response = {};
	try {
		const input = {
			AttributesToGet: ['id', 'name'],
			TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME,
			Key: { id: { S: eventID } },
		};
		const command = new GetItemCommand(input);
		response = await client.send(command);
	} catch (error) {
		console.log(error);
	}
	if (response.Item) {
		return {
			id: response['Item']['id']['S'],
			name: response['Item']['name']['S'],
		};
	}
	return null;
}
async function getVisitor(visitorID) {
	let response = {};
	try {
		const input = {
			AttributesToGet: ['id', 'code', 'phone', 'EventID'],
			TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQL_VISITORTABLE_NAME,
			Key: { id: { S: visitorID } },
		};
		const command = new GetItemCommand(input);
		response = await client.send(command);
	} catch (error) {
		console.log(error);
	}
	if (response.Item) {
		return {
			id: response['Item']['id']['S'],
			code: response['Item']['code']['N'],
			phone: response['Item']['phone']['S'],
			eventID: response['Item']['EventID']['S'],
		};
	}
	return null;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async (event) => {
	const eventBody = event?.body ? JSON.parse(event.body) : { eventID: null, phone: null };
	const visitorID = eventBody.visitorID;
	const eventID = eventBody.eventID;
	const phone = eventBody.phone;
	const code = eventBody.code;

	console.log(`ID: ${visitorID}`);
	console.log(`EventID: ${eventID}`);
	console.log(`PHONE: ${phone}`);
	console.log(`CODE: ${code}`);

	if (!visitorID || !eventID || !phone || !code) throw new Error('DATA MISSING');

	const eventData = await getEvent(eventID);
	console.log(`EVENT: ${JSON.stringify(eventData)}`);
	if (!eventData?.id) throw new Error('NO EVENT');

	const visitor = await getVisitor(visitorID);
	console.log(`VISITOR: ${JSON.stringify(visitor)}`);
	if (!visitor?.id) throw new Error('NO VISITOR');

	if (visitor.phone !== phone) throw new Error('PHONE DO NOT MATCH');
	if (visitor.eventID !== eventID) throw new Error('EVENT DO NOT MATCH');

	if (+visitor.code !== +code) {
		return {
			statusCode: 404,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
			},
			body: JSON.stringify({ message: 'Code not found!' }),
		};
	}
	const confirmation = `${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
	const variables = { input: { id: visitorID, confirmation } };

	/** @type {import('node-fetch').RequestInit} */
	const options = {
		method: 'POST',
		headers: { 'x-api-key': GRAPHQL_API_KEY },
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
		body: JSON.stringify(body.data.updateVisitor),
	};
};
