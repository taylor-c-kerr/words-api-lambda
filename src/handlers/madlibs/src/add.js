const createResponse = require('../../../services/response');
// const Validate = require('../../../services/validation');
const format = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');

/**
 * @param {object} word
 * @returns {string}
*/
const getIsAlreadyAdded = async (word) => {
	const {id, name} = word;
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

/**
 * @param {object} word The validated word to be added to the database
 * @returns {object} response The data to be used in the server's response
*/
const add = async (event) => {
	try {
		let {body} = event;
		body = JSON.parse(body);
	
		const isAlreadyAdded = await getIsAlreadyAdded(body);
		if (isAlreadyAdded) {
			response.statusCode = 400;
			return createResponse(400, {error: 'item already exists'});
		};

		const validatedWord = Validate.default(body);
		const {valid, error, warning, word} = validatedWord;
	
		if (!valid) {
			return createResponse(400, {error})
		}
		else {
			await request.add(word);
			return createResponse(201, {word: word, warning: warning})
		}
	}
	catch (error) {
		return createResponse(500, {error: error.message})
	}

}

exports.handler = add;