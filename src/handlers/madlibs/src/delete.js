const createResponse = require('../../../services/response');
const Request = require('../../../controllers/Request');
const request = new Request();

/**
 * @param {string} id The id of the word to be deleted from the database
 * @returns {object} response The data to be used in the server's response
*/
exports.handler = async (event) => {
	try {
		const { pathParameters } = event;
		const { id } = pathParameters;
	
		if (!id) {
			return createResponse(400);
		}
	
		await request.delete(id);
		return createResponse(202);
	}
	catch(error) {
		return createResponse(500, { error: error.message });
	}
}
