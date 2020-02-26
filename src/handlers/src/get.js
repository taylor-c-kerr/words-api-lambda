const Request = require('../../controllers/Request');
const request = new Request();

/**
 * @param {string} id The id of the word to be retrieved from the database
 * @returns {object} response The data to be used in the server's response
*/
const get = async (event) => {
	try {
		const { pathParameters } = event;
		const { id } = pathParameters;
	
		const word = await request.get(id);
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify(word.Item)
		}
		if (!word.Item) {
			return {statusCode: 404, body: JSON.stringify({msg: 'resource not found'})}
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
exports.handler = get;