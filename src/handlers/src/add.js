const Validate = require('../../services/validation');
const format = require('../../services/formatter');
const Request = require('../../controllers/Request');
const request = new Request();
const _ = require('lodash');

/**
 * @param {object} word
 * @returns {boolean}
*/
const isAlreadyAdded = async (word) => {
	const {id, name} = word;

	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) {
		return true;
	}

	const allWords = await request.list({name});;
	const nameExists = allWords.filter(word => word.name.toLowerCase() === name.toLowerCase());
	return nameExists.length > 0;
}

/**
 * @param {object} word The validated word to be added to the database
 * @returns {object} response The data to be used in the server's response
*/
const add = async (event) => {
	try {
		let {body} = event;
		body = JSON.parse(body);
	
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
	
		const validatedWord = await Validate.word(body);
		let {valid, error, warning, word} = validatedWord;
	
		if (!valid) {
			response.statusCode = 400;
			response.body = JSON.stringify({message: 'bad request', error: error});
		}
		else {
			word = format(word);
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