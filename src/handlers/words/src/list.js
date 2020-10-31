const ModelListRoute = require('../../model-route/model-list');

const getRandom = (results) => {
	const min = 0;
	const max = results.length - 1;
	const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return results[randomNumber];
}

const filterByValue = (results, value) => results.filter(result => result && result.category && result.category.includes(value));

const filterName = (results, name) => {
	return results.filter(result => result.name === name)
};

const filterList = (results, listValues) => {
	const supportedListValues = [
		{ name: 'noun', i: 0},
		{ name: 'verb', i: 0},
		{ name: 'adjective', i: 0},
		{ name: 'adverb', i: 0},
		{ name: 'random', i: 1},
	];

	listValues = listValues.split(',');
	listValues.forEach(listValue => {
		if (!supportedListValues.find(v => v.name === listValue)) throw Error('Invalid list query param');
	});
	// ensures there be a max of 2 values
	if (listValues.length > 2 || listValues.length === 0) throw Error('Max length of list query params is 2');
	// ensures 'random' be a value if there are more than 1 values
	if (listValues.length > 1 && !listValues.includes('random')) throw Error(`Must include 'random' if including 2 list query params`);

	if (listValues.length === 1) {
		if (listValues[0] === 'random') return getRandom(results);
		return filterByValue(results, listValues[0]);
	}

	// ensures random is applied last
	listValues.sort((a,b) => {
		return supportedListValues.find(v => v.name === a)['i'] - supportedListValues.find(v => v.name === b)['i']
	});

	results = filterByValue(results, listValues[0]);
	return getRandom(results);
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
