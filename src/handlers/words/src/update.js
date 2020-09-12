const Validate = require('../../../services/validation');
const formatter = require('../../../services/formatter');
const Request = require('../../../controllers/Request');
const request = new Request();
const _ = require('lodash');
const ModelUpdateRoute = require('../../model-route/model-update');

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

const update = async (event) => {
	const route = new ModelUpdateRoute(event, {
		format,
		validate,
		checkForUnsupportedUpdate,
		defineResponse
	});
	 const response = await route.update();
	 return response;
}

exports.handler = update;
