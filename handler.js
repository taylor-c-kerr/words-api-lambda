'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
})
let params = {
	TableName: 'words-local'
}

module.exports.list = async (event) => {
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

module.exports.get = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters;
  params.Key = pathParameters;
  try {
    const body = await dynamo.get(params).promise();
    console.log(body);
    if (!body.Item) {
      return {statusCode: 404, body: JSON.stringify({msg: 'resource not found'})}
    }
    const response = {
      statusCode: 200,
      headers: {
        'x-custom-header': 'My header value'
      },
      body: JSON.stringify(body.Item)
    }
    return response;
  }
  catch(error) {
    console.log(error);
  }
}

module.exports.add = async (event) => {
  let { body } = event;
  body = JSON.parse(body);
  params.Item = body;

  if (!body.id || !body.name) {
    return {statusCode: 400, body: JSON.stringify({msg: 'bad request'})}
  }
  try {
    await dynamo.put(params).promise();
    const response = {
      statusCode: 201,
      headers: {
        'x-custom-header': 'My header value'
      },
      body: JSON.stringify({msg: 'item added', item: body})
    }

    return response
  }
  catch (error) {
    return error;
  }
}

module.exports.update = async (event) => {
  const { body, pathParameters } = event;
  const { id } = pathParameters;
  params.Key = pathParameters;
  const word = JSON.parse(body)
  console.log(word);  
  if (word.id || word.name) {
    return {statusCode: 400, body: JSON.stringify({msg: 'bad request'})}
  }

  try {
    const exists = await dynamo.get(params).promise();
    if (!exists.Item) {
      return {statusCode: 404, body: JSON.stringify({msg: 'resource not found'})}
    }

    await dynamo.update(params).promise();
    const response = {
      statusCode: 201,
      headers: {
        'x-custom-header': 'My header value'
      },
      body: JSON.stringify({msg: 'item updated', item: {id: id, updated: word}})
    }
    return response;
  }
  catch(error) {
    console.log(error);
  }
}

module.exports.delete = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters;
  params.Key = pathParameters;
  if (!id) {
    return {statusCode: 400, body: JSON.stringify({msg: 'bad request'})}
  }
  try {
    await dynamo.delete(params).promise();
    
    const response = {
      statusCode: 202,
      headers: {
        'x-custom-header': 'My header value'
      },
      body: JSON.stringify({msg: 'item deleted', id: id})
    }
    console.log(response);
    return response;
  }
  catch(error) {
    console.log(error);
  }
}
