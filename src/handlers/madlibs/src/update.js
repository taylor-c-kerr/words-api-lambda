const createResponse = require('../../../services/response');
// const format = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const Validate = require('../../../services/validation');

/**
 * @param {string} id The id of the madlib to be updated
 * @param {object} madlib The data to be updated
 * @returns {object} response The data to be used in the server's response
*/
const getIsTitleChanged = async (body) => {
	const { title, id } = body;
	const allMadlibsByTitle = await request.list({title});
	const madlibById = await request.get(id);
	return allMadlibsByTitle.length === 0 || madlibById.Item.title !== title;
}

const update = async (event) => {
	try {
		const { pathParameters } = event;
		const body = JSON.parse(event.body);
		const { id } = pathParameters;
	
		if (!body.id) {
			body.id = id;
		}
	
		const idExists = await request.get(id);
		if (_.isEmpty(idExists)) {
			return createResponse(404);
		}
	
		if (!body.id) {
			body.id = id;
		} else if (body.id !== id) {
			return createResponse(400, {error: 'incorrect id'});
		}

		const isTitleChanged = await getIsTitleChanged(body);
		if (isTitleChanged) {
			return createResponse(400, {error: `can't change title`});
		}
	
		// todo, add this back when validation has been added for madlibs
		const validatedMadlib = await Validate.addMadlib(body);
		const { valid, error, warning, madlib } = validatedMadlib;
		console.log('validatedMadlib', validatedMadlib)

		if (!valid) {
			return createResponse(400, { error })
		}
		else {
			await request.update(madlib);
			return createResponse(201, { madlib, warning });
		}

		await request.update(body);
		return createResponse(201, { madlib: body })
	}
	catch(error) {
		return createResponse(500, { error: error.message })
	}
}
exports.handler = update;