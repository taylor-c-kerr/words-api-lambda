const Request = require('../../../controllers/Request');
const request = new Request();

/**
 * @returns {object} response The data, including all the data from the db, to be used in the server's response
*/
const list = async (event) => {
	try {
		const {queryStringParameters} = event;

		let response = {
			statusCode: null,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: [],
		};
	
		const dynamoResponse = await request.list();
		response.statusCode = 200;
		response.body = JSON.stringify(dynamoResponse.filter(res => res.title));

		if (queryStringParameters && queryStringParameters.title) {
			const exists = dynamoResponse.filter(res => res.title === queryStringParameters.title);
			response.body = JSON.stringify(exists);
			response.statusCode = !exists.length ? 404 : exists.length ? 200 : 500;
		};
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
exports.handler = list;