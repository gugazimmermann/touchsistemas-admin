/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQLAPI_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQLAPI_VISITORTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQLAPI_VISITORTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import AWS from 'aws-sdk';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const snsClient = new SNSClient({ region: process.env.REGION });
const dynamoDBClient = new DynamoDBClient({ region: process.env.REGION });

async function getEvent(eventID) {
	let response = {};
	try {
		const input = {
			AttributesToGet: ['id', 'name'],
			TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQLAPI_EVENTTABLE_NAME,
			Key: { id: { S: eventID } },
		};
		const command = new GetItemCommand(input);
		response = await dynamoDBClient.send(command);
	} catch (error) {
		console.log(error);
	}
	let event = {
		id: response['Item']['id']['S'],
		name: response['Item']['name']['S'],
	};
	return event;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	const eventType = event.Records[0].eventName;
	console.log(`EVENT TYPE: ${eventType}`);
	if (eventType === 'INSERT') {
		const records = event.Records.map((record) => ({
			new: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage),
			old: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage),
		}));
		console.log(`RECORDS: ${JSON.stringify(records)}`);
		const newRecord = records[0].new;
		console.log(`NEW: ${JSON.stringify(newRecord)}`);

		const eventData = await getEvent(newRecord.EventID);
		console.log(`EVENT DATA: ${JSON.stringify(eventData)}`);
		if (eventData.id) {
			const message = `${eventData.name} agradece sua participação. Seu código de verificação é ${newRecord.code}`;
			const input = {
				Message: message,
				PhoneNumber: `+${newRecord.phone.replace(/\D/g, "")}`,
			};
			try {
				const command = new PublishCommand(input);
				const data = await snsClient.send(command);
				console.log("Success.", data);
				return {
					statusCode: 200,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': '*',
					},
					body: JSON.stringify({ body: data }),
				};
			} catch (err) {
				console.log("Error", err.stack);
				throw new Error('FAILED TO SEND SMS');
			}
		} else {
			throw new Error('NO EVENT');
		}
	} else {
		return Promise.resolve('Successfully processed DynamoDB record');
	}
};
