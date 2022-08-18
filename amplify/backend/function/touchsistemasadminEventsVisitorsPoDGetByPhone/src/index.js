/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_VISITORTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_VISITORTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import {
	DynamoDBClient,
	GetItemCommand,
	QueryCommand
} from 'file:///opt/nodejs/node_modules/@aws-sdk/client-dynamodb/dist-cjs/index.js';

const client = new DynamoDBClient({ region: process.env.REGION });

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

async function getVisitor(eventID, phone) {
	let response = {};
	const input = {
		TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQL_VISITORTABLE_NAME,
		IndexName: 'byPhoneAndEventID',
		KeyConditionExpression: 'phone = :phone and EventID = :eventID',
		ExpressionAttributeValues: { ':phone': {S: phone}, ':eventID': {S: eventID}}
	};
	try {
		const command = new QueryCommand(input);
		response = await client.send(command);
	} catch (error) {
		console.log(error);
	}
	if (response.Items && response.Items.length) {
		return {
			id: response['Items'][0]['id']['S'],
			eventID: response['Items'][0]['EventID']['S'],
			phone: response['Items'][0]['phone']['S'],
			confirmation: response['Items'][0]['confirmation'] ? response['Items'][0]['confirmation']['S'] : null,
			codeUsed: response['Items'][0]['codeUsed'] ? response['Items'][0]['codeUsed']['S'] : null,
		};
	}
	return null;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async (event) => {
	const eventBody = event?.body ? JSON.parse(event.body) : { eventID: null, phone: null };
	const eventID = eventBody.eventID;
	const phone = eventBody.phone;

	console.log(`EventID: ${eventID}`);
	console.log(`PHONE: ${phone}`);

	if (!eventID || !phone) throw new Error('DATA MISSING');

	const eventData = await getEvent(eventID);
	console.log(`EVENT: ${JSON.stringify(eventData)}`);
	if (!eventData?.id) throw new Error('NO EVENT');

	const visitor = await getVisitor(eventID, phone);
	console.log(`VISITOR: ${JSON.stringify(visitor)}`);
	if (!visitor?.id) throw new Error('NO VISITOR');

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		},
		body: JSON.stringify(visitor),
	};
};
