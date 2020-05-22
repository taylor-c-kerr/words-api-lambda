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
			const {name, list} = queryStringParameters;
			if (name) {
				const byName = dynamoResponse.filter(entry => entry.name === name);
				if (byName) {
					const statusCode = byName.length ? 200 : 404;
					return createResponse(statusCode, byName)
				}
				return createResponse(500, {error: 'error filtering by name'});
			}
			else if (list) {
				const byList = dynamoResponse.filter(entry => entry.category.includes(list));
				if (byList) {
					const statusCode = byList.length ? 200 : 404;
					return createResponse(statusCode, byList)
				}
				return createResponse(500, {error: 'error filtering by list'});
			}
		};
		return createResponse(200, dynamoResponse.filter(res => res.name));
	}
	catch(error) {
		return createResponse(500, {error: error.message});
	}
}

exports.handler = list;
