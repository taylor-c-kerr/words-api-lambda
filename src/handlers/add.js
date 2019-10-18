const Request = require('./Request')
const request = new Request();

const add = async (word) => {
	await request.add(word);
	const response = {
		statusCode: 201,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify(word)
	}
	return response;

}
module.exports = add;