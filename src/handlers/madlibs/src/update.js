const createResponse = require('../../../services/response');
const format = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const Validate = require('../../../services/validation');

/**
 * @param {string} id The id of the word to be updated
 * @param {object} word The data to be updated
 * @returns {object} response The data to be used in the server's response
*/
const getIsNameChanged = async (body) => {
	const { name, id } = body;
	const allWordsByName = await request.list({name});
	const wordById = await request.get(id);
	return allWordsByName.length === 0 || wordById.Item.name !== name;
}

const update = async (event) => {
	try {
		const { pathParameters } = event;
		const body = JSON.parse(event.body);
		const { id } = pathParameters;
	
		if (!body.id) {
			body.id = id;
		}
	
		const isNameChanged = await getIsNameChanged(body);

		const idExists = await request.get(id);
		if (_.isEmpty(idExists)) {
			return createResponse(404);
		}
	
		if (!word.id) {
			word.id = id;
		} else if (word.id !== id) {
			return createResponse(400, {error: 'incorrect id'});
		}

		const isNameChanged = await getIsNameChanged(word);
		if (isNameChanged) {
			return createResponse(400, {error: `can't change name`});
		}
	
		const validatedWord = await Validate.default(body);
		const {valid, error, warning, word} = validatedWord;

		if (!valid) {
			return createResponse(400, {error})
		}
		else {
			await request.update(word);
			return createResponse(201, {word, warning});
		}
	}
	catch(error) {
		return createResponse(500, {error: error.message})
	}
}
exports.handler = update;