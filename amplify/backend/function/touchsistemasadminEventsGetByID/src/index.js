/* Amplify Params - DO NOT EDIT
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_ARN
	API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME
	API_TOUCHSISTEMASADMINGRAPHQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient, GetItemCommand } from 'file:///opt/nodejs/node_modules/@aws-sdk/client-dynamodb/dist-cjs/index.js';
const client = new DynamoDBClient({ region: process.env.REGION });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async (event) => {
    const id = event?.pathParameters?.id ? event.pathParameters.id : event?.id ? event.id : null;
    console.log(`ID: ${id}`);

    if (id) {
        let response = {};
        try {
            const input = {
                AttributesToGet: ['id', 'dates', 'name'],
                TableName: process.env.API_TOUCHSISTEMASADMINGRAPHQL_EVENTTABLE_NAME,
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
