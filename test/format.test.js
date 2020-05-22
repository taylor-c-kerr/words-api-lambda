const format = require('../src/services/formatter');
const should = require('chai').should();

describe('Formatter', function() {
	describe('to lower case', function() {
		it('makes everything lower case', function() {
			const unformatted = {
				"name":"DOG",
				"definition":[
					{
						"entries":[ "A FUN LOVING PET", "A DOMESTICATED CANINE" ],
						"partOfSpeech":"NOUN"
					},
					{
						"entries":[ "TO TORMENT SOMEONE" ],
						"partOfSpeech":"VERB"
					}
				],
				"id":"33459554-A8F0-46C2-9B51-D59844209892",
				"category":[ "NOUN", "VERB", "ANIMAL" ]
			};
			const formatted = {
				"name":"dog",
				"definition":[
					{
						"entries":[ "a fun loving pet", "a domesticated canine" ],
						"partOfSpeech":"noun"
					},
					{
						"entries":[ "to torment someone" ],
						"partOfSpeech":"verb"
					}
				],
				"id":"33459554-a8f0-46c2-9b51-d59844209892",
				"category":[ "noun", "verb", "animal" ]
			};

			format(unformatted).should.deep.equal(formatted);
		});
	});
});