const uuidv4 = require('uuid/v4')

class Validate {
	async word(word) {
		let {name, id, category, definition} = word;

		let validated = {
			valid: true,
			error: [],
			warning: [],
			word: word
		}

		// name should be a string
		// tested
		if (!this.isString(name)) {
			let error = [...validated.error];
			error.push('Name is not a string.')
			validated = {
				valid: false,
				error: error
			}
		}

		// if id is not provided or is improper, create a proper one
		// tested
		if (!id || !this.isGuid(id)) {
			id = uuidv4();
			let warning = [...validated.warning]
			warning.push(`Improper ID.  A proper one was created for you: ${id}.`);
			validated.warning = warning;
			validated.word.id = id;
		}

		// category should be an array
		// tested
		if (!this.isArray(category)) {
			let error = [...validated.error];
			error.push('Category must be an array.');
			validated = {
				valid: false,
				error: error
			}
		}

		// items in category should be strings
		// tested
		if (!this.arrayOnlyContains(category, 'string')) {
			let error = [...validated.error];
			error.push('Categories must be strings.');
			validated = {
				valid: false,
				error: error
			}
		}

		// definition should be an array
		// tested
		if (!this.isArray(definition)) {
			let error = [...validated.error];
			error.push('Definition must be an array.');
			validated = {
				valid: false,
				error: error
			}
		}

		// definitions should be an array of objects
		// tested
		if (definition && !this.arrayOnlyContains(definition, 'object')) {
			let error = [...validated.error];
			error.push('Definitions must be objects.');
			validated = {
				valid: false,
				error: error
			}
		}
		else {
			// definition.partofspeech exists and should be a string
			// tested
			if (definition && !definition.every(d => d.partOfSpeech || this.isString(d.partOfSpeech))) {
				let error = [...validated.error];
				error.push('Part of speech must be a string.')
				validated = {
					valid: false,
					error: error
				}
			}
			// def.entries should be an array
			// tested
			if (definition && !definition.every(d => d.entries && this.isArray(d.entries))) {
				let error = [...validated.error];
				error.push('Entries must be an array.');
				validated = {
					valid: false,
					error: error
				}
			}
			// def.entries should be an array of strings
			// tested
			if (definition && !definition.every(d => this.arrayOnlyContains(d.entries, 'string'))) {
				let error = [...validated.error];
				error.push('Entries must be strings.');
				validated = {
					valid: false,
					error: error
				}
			}
		}

		return validated;
	}

	isGuid(id) {
		let regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		return id.match(regex);
	}

	isArray(a) {
		return Array.isArray(a) && a.length > 0;
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
}


/*
{
  "id": "271be13b-e95d-48b2-96b6-a3e842328864",
  "name": "sly",
  "category": [
    "adjective"
  ],
  "definition": [
    {
      "partOfSpeech": "adjective",
      "entries": [
        "sneaky"
      ]
    }
  ]
}
*/

module.exports = new Validate();
