const dynamo = require('./dynamo');

/**
 * Represents the client's request to the db
*/
class Request {

	/**
	 * Defines default paramters that should be included in every request
	 * @returns {object} Contains the default parameter and can be modified
	*/
	defaultParams() {
		return { TableName: 'words' }
	}

	/**
	 * Modifies the default parameters
	 * @param {object} params The parameters that should be added to the default parameters
	 * @returns {object} New parameters to be used
	*/
	modifiedParams(params) {
		let defaultParams = this.defaultParams();
		return Object.assign({}, defaultParams, params);
	}

	/**
	 * Retrieves all items from db
	 * @returns {object} All the items from the db
	*/
	async list() {
		let params = this.defaultParams();
		const response = await dynamo.scan(params).promise();
		return response.Items;
	}

	/**
	 * @param {string} id The unique ID of an item from the db
	 * @returns {object} The item from the db
	*/
	async get(id) {
		let params = this.defaultParams();
		params = this.modifiedParams({Key: {id: id}})
		const response = await dynamo.get(params).promise();
		return response;
	}

	/**
	 * @param {object} The validated word to be added to the db
	 * @returns {object} Confirmation of the word added to the db
	*/
	async add(word) {
		let params = this.defaultParams();
		params = this.modifiedParams({Item: word})
		const response = await dynamo.put(params).promise();
		return response;
	}

	/**
	 * @param {string} id The unique ID of an item to be deleted from the db
	 * @returns {object} Confirmation of the word deleted from the db
	*/
	async delete(id) {
		let params = this.defaultParams();
		params = this.modifiedParams({Key: {id: id}})
		const response = await dynamo.delete(params).promise();
		return response;
	}

	/**
	 * @param {string} id The unique ID of an item to be updated
	 * @param {object} word The data to be updated
	 * @returns
	*/
	async update(word) {
		const {id} = word;
		let params = this.defaultParams();
		params = this.modifiedParams({Item: word, Key: {id: id}});
		const response = await dynamo.put(params).promise();
		return response;
	}
}

module.exports = Request;