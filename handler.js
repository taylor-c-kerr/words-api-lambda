'use strict';
const dynamo = require('./src/dynamo');
const Validate = require('./src/services/validation/index');

let params = {
	TableName: 'words'
}
const list = require('./src/handlers/list')
const getHandler = require('./src/handlers/get')
const addHandler = require('./src/handlers/add')
const deleteHandler = require('./src/handlers/delete')
const updateHandler = require('./src/handlers/update')

const get = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters;
  return await getHandler(id);
}

const add = async (event) => {
  let { body } = event;
  body = JSON.parse(body);
  body = await Validate.word(body);

  if (!body.valid) {
    return {statusCode: 400, body: JSON.stringify({msg: 'bad request', error: body.error})}
  }

  return await addHandler(body);
}

const update = async (event) => {
  const { body, pathParameters } = event;
  const { id } = pathParameters;
  params.Key = pathParameters;
  const word = JSON.parse(body)
  return await updateHandler(id, word)
}

const delet = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters;
  if (!id) {
    return {statusCode: 400, body: JSON.stringify({msg: 'bad request'})}
  }
  return await deleteHandler(id)    
}

module.exports = {
  list, 
  get, 
  add, 
  update, 
  delet
}