const Request = require('./Request')
const request = new Request();

const get = async (id) => {
	const word = await request.get(id);
	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify(word.Item)
	}
	if (!word.Item) {
		return {statusCode: 404, body: JSON.stringify({msg: 'resource not found'})}
	}
	return response;

}
module.exports = get;