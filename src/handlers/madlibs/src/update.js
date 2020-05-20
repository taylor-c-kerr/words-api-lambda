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
const isAlreadyAdded = async (word) => {
	const {id, title} = word;
	let message;

	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) {
		message = 'ID already exists';
	}

	const allWords = await request.list({title});;
	const titleExists = allWords.filter(word => word.title.toLowerCase() === title.toLowerCase());
	message = titleExists.length > 0 ? 'title already exists' : '';
	return {message, data: titleExists};
}

const update = async (event) => {
	try {
		const { pathParameters } = event;
		let { body } = event;
		const { id } = pathParameters;
		body = JSON.parse(body);
	
		if (!body.id) {
			body.id = id;
		}
	
		const exists = await isAlreadyAdded(body);
	
		if (!exists) {
		  return {statusCode: 404, body: JSON.stringify({message: 'Resource not found.'})}
		}
	
		if (exists.data[0].id !== body.id) {
		  return {statusCode: 400, body: JSON.stringify({message: `ID's dont match`})}
		}
	
		let response = {
			statusCode: null,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: null,
		};

		body = format(body);
		const validatedWord = await Validate.word(body);
		let {valid, error, warning, word} = validatedWord;

		if (!valid) {
			response.statusCode = 400;
			response.body = JSON.stringify({message: 'Bad request.', error: error});
		}
		else {
			await request.update(word);
			response.statusCode = 201;
			response.body = JSON.stringify({word: word, warning: warning});
		}

		return response;	
	}
	catch(error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({message: 'error', error: error.message}),
		}
	}
}
exports.handler = update;