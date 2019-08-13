const Request = require('./Request')
const request = new Request();

const add = async (word) => {
	await request.add(word);
	const response = {
		statusCode: 201,
		headers: {
			'x-custom-header': 'My header value'
		},
		body: JSON.stringify(word)
	}
	return response;

}
module.exports = add;