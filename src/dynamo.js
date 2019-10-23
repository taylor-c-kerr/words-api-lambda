const AWS = require('aws-sdk');
const profile = process.env.AWS_PROFILE;

let options = {}

// sets the local variables to test locally instead of using the real resources
if (profile === 'offline') {
	options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000', 
    accessKeyId: 'DEFAULT_ACCESS_KEY', 
    secretAccessKey: 'DEFAULT_SECRET'
	}
}

const dynamo = new AWS.DynamoDB.DocumentClient(options)

module.exports = dynamo;
