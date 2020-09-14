const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const Validate = require('../../../services/validation');
const ModelUpdateRoute = require('../../model-route/model-update');

const getMadlibById = (id) => request.get(id);

const getMadlibsByTitle = (title) => request.list({ title });

const handleId = (madlib, id) => {
	if (!madlib.id) {
		madlib.id = id;
	} else if (madlib.id !== id) {
		return 'Incorrect ID';
	}
};

const checkForUnsupportedUpdate = async (madlib, id) => {
	const isIdIncorrect = handleId(madlib, id);
	if (isIdIncorrect) return isIdIncorrect;
	const [madlibById, madlibsByTitle] = await Promise.all([getMadlibById(madlib.id), getMadlibsByTitle(madlib.title)]);
	
	if (_.isEmpty(madlibById)) {
		return 404;
	}

	if (madlibById.Item.title !== madlib.title || madlibsByTitle.length === 0) {
		return `Can't change title`;
	}
}

const validate = (madlib) => {
	const result = Validate.addMadlib(madlib);
	if (result.error.length) return result.error;
};

const defineResponse = (madlib) => ({ madlib });

const update = async (event) => {
	const route = new ModelUpdateRoute(event, {
		validate,
		checkForUnsupportedUpdate,
		defineResponse
	});
	 return await route.update();
}

exports.handler = update;
