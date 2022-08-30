// Need to create images bucket and add permissions manually
// images.touchsistemas.com.br
// solve sharp error -> npm install --arch=x64 --platform=linux sharp
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sharp = require('sharp');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
	console.log('Reading Records from event:\n', event.Records[0]);
	const srcBucket = event.Records[0].s3.bucket.name;
	const destBucket = 'images.touchsistemas.com.br';
	const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
	const destKeyArr = srcKey.split('.');
	destKeyArr.pop();
	destKeyArr.push('png');
	const destKey = destKeyArr.join('.');
	const typeMatch = srcKey.match(/\.([^.]*)$/);
	if (!typeMatch) {
		console.log('Could not determine the image type.');
		return;
	}
	const imageType = typeMatch[1].toLowerCase();
	if (imageType != 'jpg' && imageType != 'png') {
		console.log(`Unsupported image type: ${imageType}`);
		return;
	}
	let originalImage = null;
	let buffer = null;
	let putResult = null;
	try {
		originalImage = await s3.getObject({ Bucket: srcBucket, Key: srcKey }).promise();
	} catch (error) {
		console.log(error);
		return error;
	}

	if (originalImage) {
		try {
			buffer = await sharp(originalImage.Body).resize(500).png().toBuffer();
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	if (buffer) {
		// try {
		// 	putResult = await s3.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();
		// } catch (error) {
		// 	console.log(error);
		// 	return error;
		// }
		try {
			putResult = await s3.putObject({ Bucket: destBucket, Key: destKey, Body: buffer, ContentType: 'image/webp' }).promise();
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	if (putResult) {
		console.log(`Successfully resized ${srcBucket}/${srcKey} to ${destBucket}/${destKey}`);
	} else {
		throw new Error(`Error while resize image ${srcBucket}/${srcKey}`);
	}
};
