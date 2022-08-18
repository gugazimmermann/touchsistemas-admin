/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { default as fetch, Request } from 'file:///opt/nodejs/node_modules/node-fetch/src/index.js';
import { SNSClient, PublishCommand } from 'file:///opt/nodejs/node_modules/@aws-sdk/client-sns/dist-cjs/index.js';
import { DynamoDBClient, GetItemCommand } from 'file:///opt/nodejs/node_modules/@aws-sdk/client-dynamodb/dist-cjs/index.js';

const snsClient = new SNSClient({ region: process.env.REGION });
const dynamoDBClient = new DynamoDBClient({ region: process.env.REGION });

const GRAPHQL_ENDPOINT = process.env.API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
	mutation CREATE_VISITOR($input: CreateVisitorInput!) {
		createVisitor(input: $input) {
			id,
			phone,
			code,
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
			AttributesToGet: ['id', 'name'],
			TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME,
			Key: { id: { S: eventID } },
		};
		const command = new GetItemCommand(input);
		response = await dynamoDBClient.send(command);
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
		const eventData = await getEvent(eventID);
		console.log(`EVENT: ${JSON.stringify(eventData)}`);

		if (eventData.id) {
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

			if (statusCode === 200) {
				const message = `${eventData.name} agradece sua participação. Seu código de verificação é ${code}`;
				const input = { Message: message, PhoneNumber: phone };
				try {
					const command = new PublishCommand(input);
					const data = await snsClient.send(command);
					console.log("Success.", data);
				} catch (err) {
					console.log("Error", err.stack);
					throw new Error('FAILED TO SEND SMS');
				}
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
