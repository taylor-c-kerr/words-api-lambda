const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient(/*{
    region: 'localhost', // localhost for local dev
    endpoint: 'http://localhost:8000',  // http://localhost:8000 for local dev
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
}*/)

module.exports = dynamo;