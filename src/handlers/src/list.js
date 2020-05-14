const Request = require('../../controllers/Request');
const request = new Request();

/**
 * @returns {object} response The data, including all the data from the db, to be used in the server's response
*/
const list = async (event) => {
	try {
		const {queryStringParameters} = event;
	
		let response = {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: [],
		};
	
		const dynamoResponse = await request.list();
		response.statusCode = 200;
		response.body = JSON.stringify(dynamoResponse);
	
		if (queryStringParameters) {
			const {name, list} = queryStringParameters;
			if (name) {
				const exists = dynamoResponse.filter(entry => entry.name === name);
				response.body = JSON.stringify(exists);
				response.statusCode = !exists.length ? 404 : exists.length ? 200 : 500;
				return response
			}
			else if (list) {
				const filtered = dynamoResponse.filter(entry => entry.category.includes(list));
				response.body = JSON.stringify(filtered);
				response.statusCode = !filtered.length ? 404 : filtered.length ? 200 : 500;
				return response
			}
		};
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