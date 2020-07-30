const createResponse = require('../../../services/response');
const Request = require('../../../controllers/Request');
const request = new Request();

/**
 * @returns {object} response The data, including all the data from the db, to be used in the server's response
*/
const list = async (event) => {
	try {
		const {queryStringParameters} = event;
		const dynamoResponse = await request.list();
		if (queryStringParameters) {
			const { title } = queryStringParameters;
			if (title) {
				const byTitle = dynamoResponse.filter(entry => entry.title === title);
				const statusCode = byTitle.length ? 200 : 404;
				return createResponse(statusCode, byTitle)
			}
		}
		return createResponse(200, dynamoResponse.filter(res => res.title));
	}
	catch(error) {
		return createResponse(500, {error: error.message})
	}
}

exports.handler = list;
