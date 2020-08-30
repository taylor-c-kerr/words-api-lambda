const _ = require('lodash');
const messages = {
  '200': 'success',
  '201': 'success',
  '202': 'success',
  '400': 'bad request',
  '404': 'not found',
  '401': 'not authorized',
  '500': 'server error',
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
};

const createResponse = (statusCode, body = {}) => {
  const response = {
    statusCode,
    headers
  };
  if (statusCode === 200) {
    response.body = JSON.stringify(body);
    return response;
  } else {
    const message = !messages[statusCode] ? messages[400] : messages[statusCode];
    response.body = JSON.stringify({message, ...body});
    return response
  }
}

module.exports = createResponse;
