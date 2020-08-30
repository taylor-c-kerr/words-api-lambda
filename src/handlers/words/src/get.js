const ModelGetRoute = require('../../model-route/model-get');

exports.handler = async (event) => {
	const getHandler = new ModelGetRoute(event);
	return await getHandler.get();
};
