const ModelDeleteRoute = require('../../model-route/model-delete');

exports.handler = async (event) => {
	const deleteHandler = new ModelDeleteRoute(event);
	return await deleteHandler.delete();
}
