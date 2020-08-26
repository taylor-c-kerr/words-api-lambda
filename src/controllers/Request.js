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
	 * @param options Filters to apply to the result
	 * @returns {object} All the items from the db
	*/
	async list(options = {}) {
		let params = this.defaultParams();
		const response = await dynamo.scan(params).promise();
		const items = response.Items;

		if (options.name) {
			return items.filter(item => item.name === options.name);
		}
		if (options.title) {
			return items.filter(item => item.title === options.title);
		}
		return items;
	}

	/**
	 * Gets a specific item from db
	 * @param {string} id The unique ID of an item from the db
	 * @returns {object} The item from the db
	*/
	async get(id) {
		let params = this.defaultParams();
		params = this.modifiedParams({Key: {id: id}});
		const response = await dynamo.get(params).promise();
		return response;
	}

	/**
	 * Adds a new word to db
	 * @param {object} word The validated word to be added to the db
	 * @returns {object} Confirmation of the word added to the db
	*/
	async add(word) {
		let params = this.defaultParams();
		params = this.modifiedParams({Item: word});
		const response = await dynamo.put(params).promise();
		return response;
	}

	/**
	 * Deletes a specific word to db
	 * @param {string} id The unique ID of an item to be deleted from the db
	 * @returns {object} Confirmation of the word deleted from the db
	*/
	async delete(id) {
		let params = this.defaultParams();
		params = this.modifiedParams({Key: {id: id}});
		const response = await dynamo.delete(params).promise();
		return response;
	}

	/**
	 * Updates a word to db
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