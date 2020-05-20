const Validate = require('../../../services/validation');
const format = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');

/**
 * @param {object} word
 * @returns {string}
*/
const isAlreadyAdded = async (word) => {
	const {id, name} = word;
	let message;

	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) {
		message = 'ID already exists';
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
		body = format(body);
	
		let response = {
			statusCode: null,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: null,
		};
	
		const exists = await isAlreadyAdded(body);
		if (exists) {
			response.statusCode = 400;
			response.body = JSON.stringify({message: 'bad request', error: 'Word already exists.'});
	
			return response;
		};

		let validatedWord;

		if (body.category.includes('place')) {
			validatedWord = Validate.default(body);
		}
		else {
			validatedWord = Validate.word(body);
		}

		let {valid, error, warning, word} = validatedWord;
	
		if (!valid) {
			response.statusCode = 400;
			response.body = JSON.stringify({message: 'bad request', error: error});
		}
		else {
			await request.add(word);
			response.statusCode = 201;
			response.body = JSON.stringify({word: word, warning: warning});
		}
	
		return response;
	}
	catch (error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({msg: 'error', error: error.message}),
		}
	}

}

exports.handler = add;