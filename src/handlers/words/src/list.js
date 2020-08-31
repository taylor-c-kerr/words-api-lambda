const createResponse = require('../../../services/response');
const Request = require('../../../controllers/Request');
const request = new Request();
const ModelListRoute = require('../../model-route/model-list');

const filterName = (results, name) => {
	return results.filter(result => result.name === name)
};
const filterList = (results, listValue) => {
	return results.filter(result => result && result.category && result.category.includes(listValue))
};

const filter = (param, results) => {
	if (!param) return results;
	const filterParams = ['name', 'list'];
	if (!filterParams.includes(param)) {
		throw Error('Invalid query param');
	}
	if (param === 'name') {
		return filterName(results, param);
	} else if (param === 'list') {
		return filterList(results, param);
	}
}

const listOld = async (event) => {
	try {
		const {queryStringParameters} = event;
		const dynamoResponse = await request.list();
	
		/* if (queryStringParameters) {
			filter(queryStringParameters, dynamoResponse)
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
				const byList = dynamoResponse.filter(entry => {
					return entry && entry.category && entry.category.includes(list)
				});
				if (byList) {
					const statusCode = byList.length ? 200 : 404;
					return createResponse(statusCode, byList)
				}
				return createResponse(500, {error: 'error filtering by list'});
			}
		}; */
		return createResponse(200, dynamoResponse.filter(res => res.name));
	}
	catch(error) {
		return createResponse(500, {error: error.message});
	}
}

const list = async (event) => {
	const listHandler = new ModelListRoute(event, {
		filter
	});
	return await listHandler.list();
}

exports.handler = list;
