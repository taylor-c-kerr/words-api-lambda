const Request = require('./Request')
const request = new Request();

const list = async () => {
	const dynamoResponse = await request.list();
	const response = {
		statusCode: 200,
		headers: {
			'x-custom-header': 'My header value'
		},
		body: JSON.stringify(dynamoResponse)
	}
	return response;

}
module.exports = list;