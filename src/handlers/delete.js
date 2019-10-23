const Request = require('../controllers/Request');
const request = new Request();

/**
 * @param {string} id The id of the word to be deleted from the database
 * @returns {object} response The data to be used in the server's response
*/
module.exports = async (id) => {
	await request.delete(id);
	const response = {
		statusCode: 202,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({msg: 'item updated', id: id})
	}
	return response;
}