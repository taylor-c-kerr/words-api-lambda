const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelAddRoute{
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

  async add() {
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

      /* check dupes stage */
      const result = await this.checkDupes(this.body);
      const { isDupe, error } = result;
      if (isDupe) {
        return this.handleError(error)
      }

      /* make request */
      await request.add(this.body);

      /* format and return response stage */
      const response = this.defineResponse(this.body);
      return createResponse(201, response)
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}
