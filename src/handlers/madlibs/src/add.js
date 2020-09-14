const Validate = require('../../../services/validation');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const ModelAddRoute = require('../../model-route/model-add');

const checkDupes = async (madlib) => {
	const { id, title } = madlib;
	const idExists = await request.get(id);
	if (!_.isEmpty(idExists)) return 'ID already exists';
	const allMadlibs = await request.list( { title });
	const titleExists = allMadlibs.filter(madlib => madlib.title.toLowerCase() === title.toLowerCase());
	return titleExists.length > 0 ? 'Madlib already exists' : '';
}

const validate = (madlib) => {
	const result = Validate.addMadlib(madlib);
	if (result.error.length) return result.error;
}

const defineResponse = (madlib) => ({ madlib });

const add = async (event) => {
	const route = new ModelAddRoute(event, {
		validate,
		checkDupes,
		defineResponse
	});
	return await route.add();
}

exports.handler = add;
