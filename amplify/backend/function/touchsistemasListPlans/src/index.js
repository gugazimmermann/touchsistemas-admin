/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASAPIGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_TOUCHSISTEMASAPIGRAPHQL_PLANTABLE_ARN
	API_TOUCHSISTEMASAPIGRAPHQL_PLANTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient({ region: process.env.REGION });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async () => {
	try {
		const response = await client.send(
			new ScanCommand({ TableName: process.env.API_TOUCHSISTEMASAPIGRAPHQL_PLANTABLE_NAME })
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
