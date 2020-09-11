const Validate = require('../../../services/validation');
// const createResponse = require('../../../services/response');
const formatter = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const ModelUpdateRoute = require('../../model-route/model-update');

// /**
//  * @param {string} id The id of the word to be updated
//  * @param {object} word The data to be updated
//  * @returns {object} response The data to be used in the server's response
// */
// const getIsNameChanged = async (body) => {
// 	const { name, id } = body;
// 	const allWordsByName = await request.list({name});
// 	const wordById = await request.get(id);
// 	return allWordsByName.length === 0 || wordById.Item.name !== name;
// }

const getWordById = (id) => request.get(id);

const getWordsByName = (name) => request.list({name});

const handleId = (word, id) => {
	if (!word.id) {
		word.id = id;
	} else if (word.id !== id) {
		return 'Incorrect ID';
	}
};


const checkForUnsupportedUpdate = async (word, id) => {
	const isIdIncorrect = handleId(word, id);
	if (isIdIncorrect) return isIdIncorrect;
	const [wordById, wordsByName] = await Promise.all([getWordById(word.id), getWordsByName(word.name)]);
	
	if (_.isEmpty(wordById)) {
		return 404;
	}

	if (wordById.Item.name !== word.name || wordsByName.length === 0) {
		return `Can't change name`;
	}
}

const validate = (word) => {
	const result = Validate.updateWord(word);
	if (result.error.length) return result.error;
};

const format = (word) => formatter(word);

const defineResponse = (word) => ({ word });

// const updateOld = async (event) => {
	// try {
		// let { pathParameters, body } = event;
		// const { id } = pathParameters;
		// body = JSON.parse(body);
		// body = format(body);

		// const validatedWord = Validate.updateWord(body);
		// let { valid, error, word, warning } = validatedWord;
		// if (!valid) {
		// 	return createResponse(400, { error });
		// }

		// const idExists = await request.get(id);
		// if (_.isEmpty(idExists)) {
		// 	return createResponse(404);
		// }

		// if (!word.id) {
		// 	word.id = id;
		// } else if (word.id !== id) {
		// 	return createResponse(400, { error: 'incorrect id' });
		// }
		
		// const isNameChanged = await getIsNameChanged(word);
		// if (isNameChanged) {
		// 	return createResponse(400, { error: `can't change name` });
		// }

	// 	await request.update(word);
	// 	return createResponse(201, { word, warning });
	// }
	// catch(error) {
	// 	return createResponse(500, { error: error.message });
	// }
// }

const update = async (event) => {
	const route = new ModelUpdateRoute(event, {
		format,
		validate,
		checkForUnsupportedUpdate,
		defineResponse
	});
	 const response = route.update();
	 return response;
}

exports.handler = update;
