const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelUpdateRoute {
  constructor(event, stages) {
    this.body = JSON.parse(event.body);
    this.id = event.pathParameters.id;
    this.format = stages.format;
    this.validate = stages.validate;
    this.checkForUnsupportedUpdate = stages.checkForUnsupportedUpdate;
    this.defineResponse = stages.defineResponse;
  }

  handleError(error) {
    if (error === 404) return createResponse(404);
    return createResponse(400, { error });
  }

  async update() {
    try {
      /* format data stage */
      if (this.format) {
        const { error } = this.format(this.body);
        if (error) {
          return this.handleError(error);
        }
      }

      /* validate data stage */
      if (this.validate) {
        const result = this.validate(this.body);
        if (result && result.error) {
          return this.handleError(result.error);
        }
      }

      /* check for bad update stage */
      const error = await this.checkForUnsupportedUpdate(this.body, this.id);
      if (error) {
        return this.handleError(error)
      }

      /* make request */
		  await request.update(this.body);

      /* format and return response stage */
      const response = this.defineResponse(this.body);
      return createResponse(201, response)
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}
