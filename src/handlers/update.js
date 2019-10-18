const Request = require('./Request')
const request = new Request();

const update = async (id, word) => {
	const exists = await request.get(id);
    if (!exists.Item) {
      return {statusCode: 404, body: JSON.stringify({msg: 'resource not found'})}
    }
    if (exists.Item.id !== word.id) {
      return {statusCode: 400, body: JSON.stringify({msg: 'bad request'})}
    }
	const r = await request.update(id, word);
	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify(word)
	}
	return response;

}
module.exports = update;