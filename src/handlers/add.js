const Request = require('../controllers/Request');
const request = new Request();

/**
 * @param {object} word The validated word to be added to the database
 * @returns {object} response The data to be used in the server's response
*/
const add = async (word) => {
	let warning = word.warning;
	word = word.word;

	const result = await request.add(word);
	const response = {
		statusCode: 201,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({word: word, warning: warning})
	}
	return response;

}
module.exports = add;