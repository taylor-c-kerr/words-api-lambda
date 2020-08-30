const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

class ModelUpdateRoute {
  constructor(event, stages) {
    this.body = JSON.parse(event.body);
    this.format = stages.format;
    this.validate = stages.validate;
    this.checkDupes = stages.checkDupes;
    this.defineResponse = stages.defineResponse;
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async update() {
    try {
      
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}