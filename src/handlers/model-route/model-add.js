const createResponse = require('../../services/response');
const Request = require('../../controllers/Request');
const request = new Request();

module.exports = class ModelAddRoute{
  constructor(event, stages) {
    this.body = JSON.parse(event.body);
    this.dataFormattingStage = stages.dataFormatting;
    this.validationStage = stages.validation;
    this.dupeCheckStage = stages.dupeCheck;
    this.defineResponse = stages.defineResponse;
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async model() {
    try {
      // format stage
      if (this.dataFormattingStage) {
        const { error } = this.dataFormattingStage(this.body);
        if (error) {
          return this.handleError(error);
        }
      }
      // validation stage
      if (this.validationStage) {
        const result = this.validationStage(this.body);
        if (result && result.error) {
          return this.handleError(result.error);
        }
      }
      // dupe check stage
      const result = await this.dupeCheckStage(this.body);
      const { isDupe, error } = result;
      if (isDupe) {
        return this.handleError(error)
      }
      // make request
      await request.add(this.body);
      // format response stage
      const response = this.defineResponse(this.body);
      console.log(response)
			return createResponse(201, response)
    } catch (error) {
      console.log('catch', error)
      return createResponse(500, { error: error.message });
    }
  }
}