const Validate = require('../../../services/validation');
const formatter = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const ModelAddRoute = require('../../model-route/model-add');

const checkDupes = async (word) => {
	const { id, name } = word;
	let message;

	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) {
		return 'ID already exists';
	}

	const allWords = await request.list({name});;
	const nameExists = allWords.filter(word => word.name.toLowerCase() === name.toLowerCase());
	message = nameExists.length > 0 ? 'Word already exists' : '';
	return message;
}

const validate = (word) => {
	const result = Validate.addWord(word);
	if (result.error.length) return result.error;
}

const format = (word) => {
	return formatter(word);
}

const defineResponse = (word) => {
	return { word };
}

const add = async (event) => {
	const addHandler = new ModelAddRoute(event, {
		format,
		validate,
		checkDupes,
		defineResponse
	});

	const response = await addHandler.add();
	return response;
}

exports.handler = add;
