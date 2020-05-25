const Validate = require('../src/services/validation');
const should = require('chai').should();

describe('Validate', function() {
	describe('isGuid(id)', function() {
		it('should accept a proper guid', function(done) {
			let id = '271be13b-e95d-48b2-96b6-a3e842328864';
			let validate = Validate.isGuid(id);
			should.exist(validate)
			done();
		});
		it('should decline an improper guid', function(done) {
			let id = '271be13z-e95d-48b2-96b6-a3e842328864';
			let validate = Validate.isGuid(id);
			should.not.exist(validate)
			done();
		});
	});
	describe('isArray(array)', function() {
		it('should return true', function(done) {
			let a = ['this', 'is', 'an', 'array'];
			let validate = Validate.isArray(a);
			validate.should.equal(true)
			done();
		})
		it('should return false', function(done) {
			let s = 'this is a string';
			let o = {message: 'this is an object'};
			let i = 1;
			let b = true;
			let n = null;
			let u;
			let e = [];
			let es = [''];

			let validateS = Validate.isArray(s);
			let validateO = Validate.isArray(o);
			let validateI = Validate.isArray(i);
			let validateB = Validate.isArray(b);
			let validateN = Validate.isArray(n);
			let validateU = Validate.isArray(u);
			let validateE = Validate.isArray(e);
			let validateES = Validate.isArray(es);

			validateS.should.equal(false);
			validateO.should.equal(false);
			validateI.should.equal(false);
			validateB.should.equal(false);
			validateN.should.equal(false);
			validateU.should.equal(false);
			validateE.should.equal(false);
			validateES.should.equal(false);

			done();
		})
	})
	describe('isString(string)', function() {
		it('should return true', function(done) {
			let s = 'this is a string';
			let validate = Validate.isString(s);
			validate.should.equal(true)
			done();
		})
		it('should return false', function(done) {
			let a = ['this', 'is', 'an', 'array'];
			let o = {message: 'this is an object'};
			let i = 1;
			let b = true;
			let n = null;
			let u;

			let validateA = Validate.isString(a);
			let validateO = Validate.isString(o);
			let validateI = Validate.isString(i);
			let validateB = Validate.isString(b);
			let validateN = Validate.isString(n);
			let validateU = Validate.isString(u);

			validateA.should.equal(false);
			validateO.should.equal(false);
			validateI.should.equal(false);
			validateB.should.equal(false);
			validateN.should.equal(false);
			validateU.should.equal(false);

			done();
		})
	})
	describe('isObject(object)', function() {
		it('should return true', function(done) {
			let o = {message: 'this is an object'};
			let validate = Validate.isObject(o);
			validate.should.equal(true)
			done();
		})
		it('should return false', function(done) {
			let a = ['this', 'is', 'an', 'array'];
			let s = 'this is a string';
			let i = 1;
			let b = true;
			let n = null;
			let u;
			let x = undefined;

			let validateA = Validate.isObject(a);
			let validateS = Validate.isObject(s);
			let validateI = Validate.isObject(i);
			let validateB = Validate.isObject(b);
			let validateN = Validate.isObject(n);
			let validateU = Validate.isObject(u);
			let validateX = Validate.isObject(x);

			validateA.should.equal(false);
			validateS.should.equal(false);
			validateI.should.equal(false);
			validateB.should.equal(false);
			validateN.should.equal(false);
			validateU.should.equal(false);
			validateX.should.equal(false);

			done();
		})
	})
	describe('arrayOnlyContains(array, item)', function() {
		it('should return true', function(done) {
			let test1 = Validate.arrayOnlyContains([1,2,3,4], 'number');
			let test2 = Validate.arrayOnlyContains(['this', 'contains', 'strings'], 'string');
			let test3 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}], 'object');
			let test4 = Validate.arrayOnlyContains([[1],[2],[3],[4]], 'array');

			// console.log('test1');
			test1.should.equal(true);
			// console.log(test1);
			// console.log('test2');
			test2.should.equal(true);
			// console.log(test2);
			// console.log('test3');
			test3.should.equal(true);
			// console.log(test3);
			// console.log('test4');
			test4.should.equal(true);
			// console.log(test4);

			done();
		})
		it('should return false', function(done) {
			let test1 = Validate.arrayOnlyContains([], 'number');
			let test2 = Validate.arrayOnlyContains([], 'string');
			let test3 = Validate.arrayOnlyContains([], 'array');
			let test4 = Validate.arrayOnlyContains([], 'object');

			let test5 = Validate.arrayOnlyContains([null], 'number');
			let test6 = Validate.arrayOnlyContains([null], 'string');
			let test7 = Validate.arrayOnlyContains([null], 'array');
			let test8 = Validate.arrayOnlyContains([null], 'object');

			let test9 = Validate.arrayOnlyContains([undefined], 'number');
			let test10 = Validate.arrayOnlyContains([undefined], 'string');
			let test11 = Validate.arrayOnlyContains([undefined], 'array');
			let test12 = Validate.arrayOnlyContains([undefined], 'object');

			let test13 = Validate.arrayOnlyContains([1,2,3,null], 'number');
			let test14 = Validate.arrayOnlyContains([1,2,3,undefined], 'number');
			let test15 = Validate.arrayOnlyContains([1,2,3,4], 'NUMBER');
			let test16 = Validate.arrayOnlyContains([1,2,3,4], 'string');
			let test17 = Validate.arrayOnlyContains([1,2,3,4], 'array');
			let test18 = Validate.arrayOnlyContains([1,2,3,4], 'object');
			let test19 = Validate.arrayOnlyContains(1, 'number');

			let test20 = Validate.arrayOnlyContains(['this', 'contains', 'strings', null],'string');
			let test21 = Validate.arrayOnlyContains(['this', 'contains', 'strings', undefined],'string');
			let test22 = Validate.arrayOnlyContains(['this', 'contains', 'strings'],'STRING');
			let test23 = Validate.arrayOnlyContains(['this', 'contains', 'strings'],'number');
			let test24 = Validate.arrayOnlyContains(['this', 'contains', 'strings'],'object');
			let test25 = Validate.arrayOnlyContains(['this', 'contains', 'strings'],'array');
			let test26 = Validate.arrayOnlyContains('this is a string', 'string');

			let test27 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}, null], 'object');
			let test28 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}, undefined], 'object');
			let test29 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}], 'OBJECT');
			let test30 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}], 'number');
			let test31 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}], 'string');
			let test32 = Validate.arrayOnlyContains([{a: 1, b: 2}, {c: 3, d: 4}], 'array');
			let test33 = Validate.arrayOnlyContains({a: 1, b: 2}, 'object');

			let test34 = Validate.arrayOnlyContains([ [1],[2],[3],[4], null], 'array');
			let test35 = Validate.arrayOnlyContains([ [1],[2],[3],[4], undefined], 'array');
			let test36 = Validate.arrayOnlyContains([ [1],[2],[3],[4] ], 'ARRAY');
			let test37 = Validate.arrayOnlyContains([ [1],[2],[3],[4] ], 'string');
			let test38 = Validate.arrayOnlyContains([ [1],[2],[3],[4] ], 'number');
			let test39 = Validate.arrayOnlyContains([ [1],[2],[3],[4] ], 'object');

			// console.log('test1');
			test1.should.equal(false);
			// console.log(test1);
			// console.log('test2');
			test2.should.equal(false);
			// console.log(test2);
			// console.log('test3');
			test3.should.equal(false);
			// console.log(test3);
			// console.log('test4');
			test4.should.equal(false);
			// console.log(test4);
			// console.log('test5');
			test5.should.equal(false);
			// console.log(test5);
			// console.log('test6');
			test6.should.equal(false);
			// console.log(test6);
			// console.log('test7');
			test7.should.equal(false);
			// console.log(test7);
			// console.log('test8');
			test8.should.equal(false);
			// console.log(test8);
			// console.log('test9');
			test9.should.equal(false);
			// console.log(test9);
			// console.log('test10');
			test10.should.equal(false);
			// console.log(test10);
			// console.log('test11');
			test11.should.equal(false);
			// console.log(test11);
			// console.log('test12');
			test12.should.equal(false);
			// console.log(test12);
			// console.log('test13');
			test13.should.equal(false);
			// console.log(test13);
			// console.log('test14');
			test14.should.equal(false);
			// console.log(test14);
			// console.log('test15');
			test15.should.equal(false);
			// console.log(test15);
			// console.log('test16');
			test16.should.equal(false);
			// console.log(test16);
			// console.log('test17');
			test17.should.equal(false);
			// console.log(test17);
			// console.log('test18');
			test18.should.equal(false);
			// console.log(test18);
			// console.log('test19');
			test19.should.equal(false);
			// console.log(test19);
			// console.log('test20');
			test20.should.equal(false);
			// console.log(test20);
			// console.log('test21');
			test21.should.equal(false);
			// console.log(test21);
			// console.log('test22');
			test22.should.equal(false);
			// console.log(test22);
			// console.log('test23');
			test23.should.equal(false);
			// console.log(test23);
			// console.log('test24');
			test24.should.equal(false);
			// console.log(test24);
			// console.log('test25');
			test25.should.equal(false);
			// console.log(test25);
			// console.log('test26');
			test26.should.equal(false);
			// console.log(test26);
			// console.log('test27');
			test27.should.equal(false);
			// console.log(test27);
			// console.log('test28');
			test28.should.equal(false);
			// console.log(test28);
			// console.log('test29');
			test29.should.equal(false);
			// console.log(test29);
			// console.log('test30');
			test30.should.equal(false);
			// console.log(test30);
			// console.log('test31');
			test31.should.equal(false);
			// console.log(test31);
			// console.log('test32');
			test32.should.equal(false);
			// console.log(test32);
			// console.log('test33');
			test33.should.equal(false);
			// console.log(test33);
			// console.log('test34');
			test34.should.equal(false);
			// console.log(test34);
			// console.log('test35');
			test35.should.equal(false);
			// console.log(test35);
			// console.log('test36');
			test36.should.equal(false);
			// console.log(test36);
			// console.log('test37');
			test37.should.equal(false);
			// console.log(test37);
			// console.log('test38');
			test38.should.equal(false);
			// console.log(test38);
			// console.log('test39');
			test39.should.equal(false);
			// console.log(test39);

			done();
		})
	})
	describe('word(word)', function() {
		it('should validate and have no warnings', async function() {
			let validWord = {
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

			const result = await Validate.addWord(validWord);
			result.valid.should.equal(true);
		})
		
		it('should validate but have a warning', async function() {
			let validWordWithInvalidId = {
				"id": "271be13z-e95d-48b2-96b6-a3e842328864",
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

			const result = await Validate.addWord(validWordWithInvalidId);
			result.valid.should.equal(true);
			result.warning.should.not.be.empty;
			result.warning[0].should.contain('Improper ID.  A proper one was created for you');
		})

		it('should not valid a word without a category', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"definition": [
					{
						"partOfSpeech": "adjective",
						"entries": [
							"sneaky"
						]
					}
				]
			}

			const result = await Validate.addWord(invalidWord);
			result.valid.should.equal(false);
			result.error.should.not.be.empty;
			result.error[0].should.equal('Category must be an array.');
		})

		it('should not valid a word with an improper category', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": [1, 'string'],
				"definition": [
					{
						"partOfSpeech": "adjective",
						"entries": [
							"sneaky"
						]
					}
				]
			}

			let {category} = invalidWord;

			const result1 = await Validate.addWord(invalidWord);
			result1.valid.should.equal(false);
			result1.error.should.not.be.empty;
			result1.error[0].should.equal('Categories must be strings.');

			// undefined
			category[0] = undefined;
			const result2 = await Validate.addWord(invalidWord);
			result2.valid.should.equal(false);
			result2.error.should.not.be.empty;
			result2.error[0].should.equal('Categories must be strings.');

			// null
			category[0] = null;
			const result3 = await Validate.addWord(invalidWord);
			result3.valid.should.equal(false);
			result3.error.should.not.be.empty;
			result3.error[0].should.equal('Categories must be strings.');

			// array
			category[0] = ['arrays'];
			const result4 = await Validate.addWord(invalidWord);
			result4.valid.should.equal(false);
			result4.error.should.not.be.empty;
			result4.error[0].should.equal('Categories must be strings.');

			// object
			category[0] = {a: 'string'};
			const result5 = await Validate.addWord(invalidWord);
			result5.valid.should.equal(false);
			result5.error.should.not.be.empty;
			result5.error[0].should.equal('Categories must be strings.');

		})

		it('should not valid a word with an empty category', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": [],
				"definition": [
					{
						"partOfSpeech": "adjective",
						"entries": [
							"sneaky"
						]
					}
				]
			}

			const result = await Validate.addWord(invalidWord);
			result.valid.should.equal(false);
			result.error.should.not.be.empty;
			result.error[0].should.equal('Category must be an array.');
		})

		it('should not valid a word with an empty definition', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": [
					"adjective"
				],
				"definition": []
			}

			const result = await Validate.addWord(invalidWord);
			result.valid.should.equal(false);
			result.error.should.not.be.empty;
			result.error[0].should.equal('Definition must be an array.');
		})

		it('should not valid a word with an improper definition', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": ["adjective"],
				"definition": [1, {"partOfSpeech": "adjective","entries": ["sneaky"]}]
			}

			let {definition} = invalidWord;

			const result1 = await Validate.addWord(invalidWord);
			result1.valid.should.equal(false);
			result1.error.should.not.be.empty;
			result1.error[0].should.equal('Definitions must be objects.');

			// undefined
			definition[0] = undefined
			const result2 = await Validate.addWord(invalidWord);
			result2.valid.should.equal(false);
			result2.error.should.not.be.empty;
			result2.error[0].should.equal('Definitions must be objects.');

			// null
			definition[0] = null
			const result3 = await Validate.addWord(invalidWord);
			result3.valid.should.equal(false);
			result3.error.should.not.be.empty;
			result3.error[0].should.equal('Definitions must be objects.');

			// array
			definition[0] = ['arrays']
			const result4 = await Validate.addWord(invalidWord);
			result4.valid.should.equal(false);
			result4.error.should.not.be.empty;
			result4.error[0].should.equal('Definitions must be objects.');

			// string
			definition[0] = 'stringy'
			const result5 = await Validate.addWord(invalidWord);
			result5.valid.should.equal(false);
			result5.error.should.not.be.empty;
			result5.error[0].should.equal('Definitions must be objects.');
		})
		
		it('should not valid a word without a definition', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": [
					"adjective"
				]
			}

			const result = await Validate.addWord(invalidWord);
			result.valid.should.equal(false);
			result.error.should.not.be.empty;
			result.error[0].should.equal('Definition must be an array.');
		})

		it('should not validate an invalid definition object', async function() {
			let invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": ["adjective"],
				"definition": [{"entries": ["sneaky"]}]
			}

			const result1 = await Validate.addWord(invalidWord);
			result1.valid.should.equal(false);
			result1.error.should.not.be.empty;
			result1.error[0].should.equal('Part of speech must be a string.');
			result1.error.should.have.lengthOf(1);

			invalidWord = {
				"id": "271be13b-e95d-48b2-96b6-a3e842328864",
				"name": "sly",
				"category": ["adjective"],
				"definition": [{"partOfSpeech": "adjective"}]
			}

			const result2 = await Validate.addWord(invalidWord);
			result2.valid.should.equal(false);
			result2.error.should.not.be.empty;
			result2.error[0].should.equal('Entries must be an array.');
			result2.error[1].should.equal('Entries must be strings.');
			result2.error.should.have.lengthOf(2);
		})
	})
});