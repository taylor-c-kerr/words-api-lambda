### Words API
This API is a serverless API using AWS Lambda and API Gateway.  It is developed using the Serverless Framework.

## Local Setup
- Install dependencies by running `npm install`
- For local development, serverless-offline is used to emulate API Gateway and servlerless-dynamodb-local is used to emulate a DynamoDb instance.
- Install dynamodb-local by running `sls dynamodb install`
- To start the local API Gateway, run `serverless offline start`.  Not including an `AWS_PROFILE` environment variable will use the deployed version.
	- Forgetting to include `start` will not start the local db instance
	- To use the local DynamoDb instance, the `AWS_PROFILE` environment variable has to be defined as `offline`.  Run `AWS_PROFILE=offline serverless offline start`.

## Deployment
Run `serverless deploy`

## Notes
The serverless framework uses lambda proxy by default, so API gatewasy expects the response from the lambda function to include statusCode, headers, and body.  The body must be stringified.