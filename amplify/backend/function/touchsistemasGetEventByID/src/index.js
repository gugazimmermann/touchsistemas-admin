/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMIN_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMIN_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMIN_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient({ region: process.env.REGION });

export const handler = async (event) => {
	const id = event?.pathParameters?.id ? event.pathParameters.id : event?.id ? event.id : null;
	console.log(`ID: ${id}`);

	if (id) {
		let response = {};
		try {
			const input = {
				AttributesToGet: ['id', 'dates', 'name'],
				TableName: process.env.API_TOUCHSISTEMASADMIN_EVENTTABLE_NAME,
				Key: { id: { S: id } },
			};
			console.log(`INPUT: ${input}`);
			const command = new GetItemCommand(input);
			response = await client.send(command);
			console.log(`RESPONSE: ${JSON.stringify(response)}`);
		} catch (error) {
			console.log(error);
		}

		const dates = response['Item']['dates']['L'].map((d) => d['S']);
		const res = {
			id: response['Item']['id']['S'],
			name: response['Item']['name']['S'],
			dates: dates,
		};

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
			},
			body: JSON.stringify(res),
		};
	} else {
		throw new Error('NO ID');
	}
};
