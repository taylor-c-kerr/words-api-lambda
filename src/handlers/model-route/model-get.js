const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelGetRoute {
  constructor(event) {
    this.id = event.pathParameters.id;
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async get() {
    try {
      const word = await request.get(this.id);

      if (!word.Item) {
        return createResponse(404);
      }

      return createResponse(200, word.Item);
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}
