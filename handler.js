'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
})

module.exports.getAll = async (event) => {
  const params = {TableName: 'words-local'};

  const body = await dynamo.scan(params).promise();
  const response = {
  	statusCode: 200,
  	headers: {
  		'x-custom-header': 'My header value'
  	},
  	body: JSON.stringify(body)
  }
  return response
}
