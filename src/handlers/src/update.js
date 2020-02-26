const format = require('../../services/formatter');
const Request = require('../../controllers/Request');
const request = new Request();

/**
 * @param {string} id The id of the word to be updated
 * @param {object} word The data to be updated
 * @returns {object} response The data to be used in the server's response
*/
const update = async (event) => {
	try {
		const { body, pathParameters } = event;
		const { id } = pathParameters;
		let word = JSON.parse(body);
	
		if (!word.id) {
			word.id = id;
		}
	
		const exists = await request.get(id);
	
		if (!exists.Item) {
		  return {statusCode: 404, body: JSON.stringify({msg: 'resource not found'})}
		}
	
		if (exists.Item.id !== word.id) {
		  return {statusCode: 400, body: JSON.stringify({msg: 'bad request'})}
		}
	
		word = format(word);
		await request.update(word);
	
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify(word)
		}
	
		return response;	
	}
	catch(error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({msg: 'error', error: error.message}),
		}
	}
}
exports.handler = update;