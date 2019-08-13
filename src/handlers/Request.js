const dynamo = require('../dynamo');

class Request {
	defaultParams() {
		return { TableName: 'words-local' }
	}

	modifiedParams(params) {
		let defaultParams = this.defaultParams();
		return Object.assign({}, defaultParams, params);
	}

	async list() {
		let params = this.defaultParams();
		const response = await dynamo.scan(params).promise();
		return response.Items;
	}

	async get(id) {
		let params = this.defaultParams();
		params = this.modifiedParams({Key: {id: id}})
		const response = await dynamo.get(params).promise();
		return response;
	}

	async add(word) {
		let params = this.defaultParams();
		params = this.modifiedParams({Item: word})
		const response = await dynamo.put(params).promise();
		return response;
	}

	async delete(id) {
		let params = this.defaultParams();
		params = this.modifiedParams({Key: {id: id}})
		const response = await dynamo.delete(params).promise();
		return response;
	}

	async update(id, word) {
		let params = this.defaultParams();
		params = this.modifiedParams({Item: word/*, Key: {id: id}*/});
		const response = await dynamo.put(params).promise();
		return response;
	}
}

module.exports = Request;