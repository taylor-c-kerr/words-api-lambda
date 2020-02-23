const Validate = require('../../services/validation/index');
const Request = require('../../controllers/Request');
const request = new Request();

/**
 * @param {object} word The validated word to be added to the database
 * @returns {object} response The data to be used in the server's response
*/
const add = async (event) => {
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

	const exists = request.get(body.id);
	if (exists) {
		response.statusCode = 400;
		response.body = JSON.stringify({message: 'bad request', error: 'Word already exists.'});

		return response;
	};

	const validatedWord = await Validate.word(body);
	const {valid, error, warning, word} = validatedWord;

	if (!valid) {
		response.statusCode = 400;
		response.body = JSON.stringify({message: 'bad request', error: error});
	}
	else {
		const result = await request.add(word);
		response.statusCode = 201;
		response.body = JSON.stringify({word: word, warning: warning});
	}

	return response;

}

exports.handler = add;