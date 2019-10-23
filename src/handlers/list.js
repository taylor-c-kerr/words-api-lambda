const Request = require('./Request')
const request = new Request();

/**
 * @returns {object} response The data, including all the data from the db, to be used in the server's response
*/
const list = async () => {
	const dynamoResponse = await request.list();
	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify(dynamoResponse)
	}
	return response;

}
module.exports = list;