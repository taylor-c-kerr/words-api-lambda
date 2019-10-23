// import {Validation} from './index.js';
const should = require('chai').should();

describe('Validation', function() {
	describe('isGuid', function() {
		it('should accept a proper guid', function(done) {
			let id = '271be13b-e95d-48b2-96b6-a3e842328864';
			let validated = Validation.isGuid(id);
			validated.should.equal(true);
			done();
		});
		it('should decline an improper guid', function(done) {
			let id = '271be13z-e95d-48b2-96b6-a3e842328864';
			let validated = Validation.isGuid(id);
			validated.should.equal(false);
			done();
		});
	});
});
