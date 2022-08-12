/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_TOUCHSISTEMASADMINSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
const client = new S3Client({ region: process.env.REGION });
const BUCKET_NAME = process.env.STORAGE_TOUCHSISTEMASADMIN_BUCKETNAME;

async function find(objectKey) {
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey });
    await client.send(command);
    return objectKey;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */ 
 export const handler = async (event) => {
     const id = event?.pathParameters?.id ? event.pathParameters.id : event?.id ? event.id : null;
     console.log(`ID: ${id}`);
     if (id) {
         let response = {};
         try {
             response = await find(`public/logo/${id}.png`);
         } catch (error) {
             try {
                 response = await find(`public/logo/${id}.jpg`);
             } catch (error) {
                 try {
                     response = await find(`public/logo/${id}.jpeg`);
                 } catch (error) {
                     console.log(error);
                 }
                 console.log(error);
             }
             console.log(error);
         }
 
         return {
             statusCode: 200,
             headers: {
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Headers': '*',
             },
             body: JSON.stringify({ path: response }),
         };
     } else {
         throw new Error('NO ID');
     }
 };
 