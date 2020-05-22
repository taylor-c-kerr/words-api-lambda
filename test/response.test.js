const createResponse = require('../src/services/response');

describe('create response', () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  it('creates 200', () => {
    const statusCode = 200;
    const inputBody = [{name: 'test'}];
    const body = JSON.stringify(inputBody)
    const expected = {statusCode, headers, body};
    const result = createResponse(200, inputBody);
    result.should.deep.equal(expected);
  });
  
  it('creates 201', () => {
    const statusCode = 201;
    const inputBody = {word: {name: 'test'}, warning: []};
    const body = JSON.stringify({message: 'success', ...inputBody});
    const expected = {statusCode, headers, body};
    createResponse(201, inputBody).should.deep.equal(expected);
  });
  
  it('creates 202', () => {
    const statusCode = 202;
    const inputBody = {};
    const body = JSON.stringify({message: 'success'});
    const expected = {statusCode, headers, body};
    createResponse(202, inputBody).should.deep.equal(expected);
  });
  
  it('creates 400', () => {
    const statusCode = 400;
    const inputBody = {error: 'you did something wrong'};
    const body = JSON.stringify({message: 'bad request', error: 'you did something wrong'});
    const expected = {statusCode, headers, body};
    createResponse(400, inputBody).should.deep.equal(expected);
  });
  
  it('creates 404', () => {
    const statusCode = 404;
    const inputBody = {};
    const body = JSON.stringify({message: 'not found'});
    const expected = {statusCode, headers, body};
    createResponse(404, inputBody).should.deep.equal(expected);
  });
  
  it('creates 401', () => {
    const statusCode = 401;
    const inputBody = {};
    const body = JSON.stringify({message: 'not authorized'});
    const expected = {statusCode, headers, body};
    createResponse(401, inputBody).should.deep.equal(expected);
  });
  
  it('creates 500', () => {
    const statusCode = 500;
    const inputBody = {};
    const body = JSON.stringify({message: 'server error'});
    const expected = {statusCode, headers, body};
    createResponse(500, inputBody).should.deep.equal(expected);
  });
})