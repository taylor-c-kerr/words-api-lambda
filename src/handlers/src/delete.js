const Request = require('../../controllers/Request');
const request = new Request();

/**
 * @param {string} id The id of the word to be deleted from the database
 * @returns {object} response The data to be used in the server's response
*/
exports.handler = async (event) => {
	const { pathParameters } = event;
	const { id } = pathParameters;

	if (!id) {
	  return {statusCode: 400, body: JSON.stringify({message: 'bad request'})}
	}

	await request.delete(id);
	const response = {
		statusCode: 202,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({msg: 'item deleted', id: id})
	}
	return response;
}
