const createResponse = require('../../../services/response');
const Validate = require('../../../services/validation');
// const format = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');

/**
 * @param {object} madlib
 * @returns {string}
*/
const getIsAlreadyAdded = async (madlib) => {
	const { id, title } = madlib;
	let message;

	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) {
		return 'ID already exists';
	}

	const allMadlibs = await request.list( { title });
	const titleExists = allMadlibs.filter(madlib => madlib.title.toLowerCase() === title.toLowerCase());
	message = titleExists.length > 0 ? 'Madlib already exists' : '';
	return message;
}

/**
 * @param {object} word The validated word to be added to the database
 * @returns {object} response The data to be used in the server's response
*/
const add = async (event) => {
	try {
		let { body } = event;
		body = JSON.parse(body);
	
		const isAlreadyAdded = await getIsAlreadyAdded(body);
		if (isAlreadyAdded) {
			return createResponse(400, {error: 'item already exists'});
		};

		const validatedMadlib = Validate.addMadlib(body);
		const { valid, error, warning, madlib } = validatedMadlib;
		console.log(validatedMadlib)
	
		if (!valid) {
			return createResponse(400, { error })
		}
		else {
			await request.add(madlib);
			return createResponse(201, { madlib, warning })
		}
	}
	catch (error) {
		return createResponse(500, {error: error.message})
	}

}

exports.handler = add;