const uuidv4 = require('uuid/v4')
const _ = require('lodash');
class Validate {
	updateWord(word) {
		const {name, category, definition} = word;
		const validated = {
			valid: true,
			word: word
		}
		
		const error = this.checkForRequiredFields({name, category, definition});
		if (error.length) {
			validated.valid = false;
			validated.error = error;
			return validated;
		}
		
		if (!this.isString(name)) {
			error.push('Name is not a string.');
			validated.valid = false;
		}

		if (!Array.isArray(category)) {
			error.push('Category must be an array.');
			validated.valid = false;
		}

		if (!Array.isArray(definition)) {
			error.push('Definition must be an array.');
			validated.valid = false;
		}

		validated.error = error;
		return validated;
	}

	default(word) {
		const {name, id, category, definition} = word;
		const error = [];
		const warning = [];
		const validated = {
			valid: true,
			word: word
		}

		// name should be a string
		if (!this.isString(name)) {
			error.push('Name is not a string.');
			validated.valid = false;
		}

		// if id is not provided or is improper, create a proper one
		if (!id || !this.isGuid(id)) {
			const id = uuidv4();
			warning.push(`Improper ID.  A proper one was created for you: ${id}.`);
			word.id = id;
		}

		// category should be an array
		if (!Array.isArray(category)) {
			error.push('Category must be an array.');
			validated.valid = false;
		}

		// definition should be an array
		if (!Array.isArray(definition)) {
			error.push('Definition must be an array.');
			validated.valid = false;
		}

		validated.error = error;
		validated.warning = warning;
		validated.word = word;
		return validated;
	}

	addWord(word) {
		const {category, definition} = word;

		const validated = this.default(word);

		if (!validated.valid) {
			return validated;
		}

		// items in category should be strings
		if (!this.arrayOnlyContains(category, 'string')) {
			let error = [...validated.error];
			error.push('Categories must be strings.');
			validated.valid = false;
			validated.error = error;
		}

		// definitions should be an array of objects
		if (definition && !this.arrayOnlyContains(definition, 'object')) {
			let error = [...validated.error];
			error.push('Definitions must be objects.');
			validated.valid = false;
			validated.error = error;
		}
		else {
			// definition.partofspeech exists and should be a string
			if (definition && !definition.every(d => d.partOfSpeech || this.isString(d.partOfSpeech))) {
				let error = [...validated.error];
				error.push('Part of speech must be a string.')
				validated.valid = false;
				validated.error = error;
				}
			// def.entries should be an array
			if (definition && !definition.every(d => d.entries && this.isArray(d.entries))) {
				let error = [...validated.error];
				error.push('Entries must be an array.');
				validated.valid = false;
				validated.error = error;
				}
			// def.entries should be an array of strings
			if (definition && !definition.every(d => this.arrayOnlyContains(d.entries, 'string'))) {
				let error = [...validated.error];
				error.push('Entries must be strings.');
				validated.valid = false;
				validated.error = error;
				}
		}

		return validated;
	}

	// not able to push to an array in validated
	addMadlib(madlib) {
		const { title, text, id } = madlib;
		const validated = {
			valid: true,
			madlib,
			error: [],
			warning: [],
		};

		// title should be a string
		if (!this.isString(title)) {
			validated.error.push('Title is not a string.');
		}

		// text should be a string
		if (!this.isString(text)) {
			validated.error.push('Text is not a string.');
		}

		// if id is not provided or is improper, create a proper one
		if (!id || !this.isGuid(id)) {
			const id = uuidv4();
			validated.warning.push(`Improper ID.  A proper one was created for you: ${id}.`);
			madlib.id = id;
		}
		
		// prompts
		const supportedPrompts = ['noun', 'verb', 'adjective', 'adverb', 'place'];
		const prompts = madlib.text.match(/\*\*\*[a-z]+\*\*\*/g).map(prompt => prompt.replace(/\*\*\*/g, ''));
		const unsupportedPrompts = prompts.filter(prompt => {
			return !supportedPrompts.includes(prompt);
		});
		
		// only includes supported prompts
		if (unsupportedPrompts.length) {
			validated.error.push(`Unsupported prompt included: ${unsupportedPrompts}`);
		}

		// there must be at least 1 prompt
		if (!prompts.length) {
			validated.error.push('Text must include prompts');
		}

		// there are prompts, but they are all invalid
		if (_.isEqual(prompts, unsupportedPrompts)) {
			validated.error.push('There are no supported prompts');
		}

		validated.valid = validated.error.length ? false : true;
		// validated.valid = validated.error.length === 0;
		return validated;
	}

	isGuid(id) {
		let regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		return id.match(regex);
	}

	isArrayProper(a) {
		const isImproper = a.filter(aa => aa === '').length;
		return !isImproper;
	}

	isArray(a) {
		try {
			const isProper = a.length > 0 && this.isArrayProper(a);
			return Array.isArray(a) && isProper;
		}
		catch (error) {
			if (error.message === 'a.filter is not a function' || error.message.includes(`Cannot read property 'length'`)) {
				return false;
			}
			else {
				throw error;
			}
		}
	}

	isString(s) {
		return typeof s === 'string';
	}

	isObject(o) {
		return typeof o === 'object' && !Array.isArray(o) && o!==null && typeof o!==undefined;
	}

	arrayOnlyContains(array, itemType) {
		const supportedType = (x) => {
			const supportedTypes = ['object', 'string', 'array', 'number'];
			return supportedTypes.includes(x);
		}

		const supportedValue = (x) => {
			const unSupportedValues = [null, undefined];
			return !unSupportedValues.includes(x)
		}

		if (!this.isArray(array) || !supportedValue(itemType)) {
			return false;
		}

		return array.every(a => {
			if (!supportedValue(a) || !supportedType(typeof a)) {
				return false;
			}

			if (itemType === 'array') {
				return this.isArray(a);
			}

			return typeof a === itemType && !this.isArray(a);
		});
	}

	isEmptyString(s) {
		return s === '';
	}

	checkForRequiredFields(word) {
		return Object.keys(word).filter(key => !word[key]).map(key => `${key} is a required field`)
	}
}

module.exports = new Validate();
