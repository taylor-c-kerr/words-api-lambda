const ModelListRoute = require('../../model-route/model-list');

const filterTitle = (results, title) => {
	return results.filter(result => result.title === title)
};

const filter = (param, results) => {
	const providedParams = Object.keys(param);
	if (providedParams.length > 1) throw Error('Too many query params');
	if (!providedParams.length) return results;

	const paramKey = providedParams[0];
	const paramValue = param[paramKey];
	const filterParams = ['title'];
	if (!filterParams.includes(paramKey)) throw Error('Invalid query param');
	if (paramKey === 'title') {
		return filterTitle(results, paramValue);
	}
}

const list = async (event) => {
	const listHandler = new ModelListRoute(event, { filter }, 'madlibs');
	return await listHandler.list();
}

exports.handler = list;
