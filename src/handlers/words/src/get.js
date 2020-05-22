const createResponse = require('../../../services/response');
const Request = require('../../../controllers/Request');
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
		if (!word.Item) {
			return createResponse(404);
		}
		return createResponse(200, word.Item);
	}
	catch(error) {
		return createResponse(500, {error: error.message});
	}
}

exports.handler = get;
