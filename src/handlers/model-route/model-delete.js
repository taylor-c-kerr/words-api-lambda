const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelDeleteRoute {
  constructor(event, stages) {
    this.body = JSON.parse(event.body);
    this.id = event.pathParameters.id;
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async delete() {
    try {
      await request.delete(this.id);
      return createResponse(202);
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}
