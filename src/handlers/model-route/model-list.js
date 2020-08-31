const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelListRoute {
  constructor(event, stages) {
    this.queryParams = event.queryStringParameters;
    this.filter = stages.filter;
    this.results = null;
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async list() {
    try {
      this.results = await request.list();

      // handle queryParams
      if (this.filter && this.queryParams) {
        this.results = this.filter(this.queryParams, this.results);
      }

      // don't know why I am filtering by namd in the words list handler
      // return createResponse(200, dynamoResponse.filter(res => res.name));
      return createResponse(200, this.results);
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}
