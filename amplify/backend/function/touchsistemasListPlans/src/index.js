/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASADMINGRAPHQL_PLANTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_PLANTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import {
	DynamoDBClient,
	ScanCommand,
} from 'file:///opt/nodejs/node_modules/@aws-sdk/client-dynamodb/dist-cjs/index.js';
const client = new DynamoDBClient({ region: process.env.REGION });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async () => {
	try {
		const response = await client.send(
			new ScanCommand({ TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQL_PLANTABLE_NAME })
		);
		console.log(`RESPONSE: ${JSON.stringify(response)}`);
		const res = [];
		for (const item of response.Items) {
			res.push({
				id: item['id']['S'],
				type: item['type']['S'],
				name: item['name']['L'].map((i) => ({
					language: i['M']['language']['S'],
					name: i['M']['name']['S'],
				})),
				details: item['detail']['L'].map((i) => ({
					language: i['M']['language']['S'],
					detail: i['M']['detail']['L'].map((l) => l['S']),
				})),
				price: item['price']['L'].map((i) => ({
					language: i['M']['language']['S'],
					price: i['M']['price']['N'],
				})),
			});
		}
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
			},
			body: JSON.stringify(res),
		};
	} catch (error) {
		console.log(error);
	}
};
