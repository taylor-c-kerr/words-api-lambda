const ModelListRoute = require('../../model-route/model-list');

const filterName = (results, name) => {
	return results.filter(result => result.name === name)
};
const filterList = (results, listValue) => {
	return results.filter(result => result && result.category && result.category.includes(listValue))
};

const filter = (param, results) => {
	const providedParams = Object.keys(param);
	if (providedParams.length > 1) throw Error('Too many query params');
	if (!providedParams.length) return results;

	const paramKey = providedParams[0];
	const paramValue = param[paramKey];
	const filterParams = ['name', 'list'];
	if (!filterParams.includes(paramKey)) throw Error('Invalid query param');
	if (paramKey === 'name') {
		return filterName(results, paramValue);
	} else if (paramKey === 'list') {
		return filterList(results, paramValue);
	}
}

const list = async (event) => {
	const listHandler = new ModelListRoute(event, { filter }, 'words');
	return await listHandler.list();
}

exports.handler = list;
