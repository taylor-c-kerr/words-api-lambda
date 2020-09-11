const Validate = require('../../../services/validation');
const formatter = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const ModelAddRoute = require('../../model-route/model-add');

const checkDupes = async (word) => {
	const { id, name } = word;
	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) return 'ID already exists';
	const allWords = await request.list({name});;
	const nameExists = allWords.filter(word => word.name.toLowerCase() === name.toLowerCase());
	return nameExists.length > 0 ? 'Word already exists' : '';
}

const validate = (word) => {
	const result = Validate.addWord(word);
	if (result.error.length) return result.error;
}

const format = (word) => formatter(word);

const defineResponse = (word) => ({ word });

const add = async (event) => {
	const route = new ModelAddRoute(event, {
		format,
		validate,
		checkDupes,
		defineResponse
	});
	const response = await route.add();
	return response;
}

exports.handler = add;
