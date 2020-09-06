const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelListRoute {
  constructor(event, stages, listType) {
    this.queryParams = event.queryStringParameters;
    this.filter = stages.filter;
    this.results = null;
    this.listType = listType;
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async list() {
    try {
      this.results = await request.list();

      // filter results based on the type provided
      if (this.listType === 'words') {
        this.results = this.results.filter(result => result.name);
      } else if (this.listType === 'madlib') {
        this.results = this.results.filter(result => result.title);
      }

      // handle queryParams
      if (this.filter && this.queryParams) {
        this.results = this.filter(this.queryParams, this.results);
      }

      // filtering here to only get the words
      return createResponse(200, this.results);
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}
