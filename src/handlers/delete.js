const Request = require('./Request')
const request = new Request();

module.exports = async (id) => {
	await request.delete(id);
	const response = {
		statusCode: 202,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({msg: 'item updated', id: id})
	}
	return response;
}