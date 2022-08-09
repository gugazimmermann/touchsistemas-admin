/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

AWS.config.update({ region: process.env.REGION });
console.debug('REGION', process.env.REGION);

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "Event-a64kvxkngzajfngtzfr54kamkq";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = `${tableName}-${process.env.ENV}`;
}
console.debug('tableName', tableName);

const partitionKeyName = "id";
const partitionKeyType = "S";
const path = "/events/:id";
const hashKeyPath = `/:${partitionKeyName}`;

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param, 10);
    default:
      return param;
  }
}
console.debug(`${path}`)
app.get(`${path}`, (req, res) => {
  const params = {};
  params[partitionKeyName] = req.params[partitionKeyName];
  console.debug(params[partitionKeyName])
  try {
    params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
  } catch(err) {
    res.statusCode = 500;
    res.json({error: `Wrong column type ${  err}`});
  }
  console.debug('params[partitionKeyName]', params[partitionKeyName])
  const getItemParams = {
    TableName: tableName,
    Key: params
  }
  console.debug('getItemParams', getItemParams)
  dynamodb.get(getItemParams,(err, data) => {
    console.debug('err', err)
    console.debug('err', data)
    if(err) {
      res.statusCode = 500;
      res.json({error: `Could not load items: ${  err.message}`});
    } else if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("App started")
});

module.exports = app
