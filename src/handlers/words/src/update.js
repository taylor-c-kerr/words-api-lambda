const createResponse = require('../../../services/response');
const format = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');

/**
 * @param {string} id The id of the word to be updated
 * @param {object} word The data to be updated
 * @returns {object} response The data to be used in the server's response
*/
const isAlreadyAdded = async (word) => {
	const {id, name} = word;
	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) {
		return { message: 'ID already exists', words:[] };
	}

	const allWords = await request.list({name});;
	const nameExists = allWords.filter(word => word.name.toLowerCase() === name.toLowerCase());
	const message = nameExists.length ? 'Name already exists' : '';
	return {message, words: nameExists};
}

const update = async (event) => {
	try {
		const { pathParameters } = event;
		let { body } = event;
		const { id } = pathParameters;
		const word = JSON.parse(body);
	
		if (!body.id) {
			body.id = id;
		}
		
		await request.update(word);
		return createResponse(201, {word});
	
	}
	catch(error) {
		return createResponse(500, {error: error.message})
	}
}
exports.handler = update;