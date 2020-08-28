const createResponse = require('../../../services/response');

export default class ModelAddRoute{
  constructor(event, stages) {
    this.event = JSON.parse(event);
    this.dataFormattingStage = stages.dataFormatting;
    this.validationStage = stages.validation;
    this.dupeCheckStage = stages.dupeCheck;
    this.defineResponse = stage.defineResponse;
    this.body = {};
    this.valid = null;
    this.error = null;
    this.warning = null;
    this.result = {};
  }

  handleError(error) {
    return createResponse(400, { error });
  }

  async model() {
    try {
      this.body = this.event;

      // format stage
      if (this.dataFormattingStage) {
        const { error } = this.dataFormattingStage(this.body);
        if (error) {
          return this.handleError(error);
        }
      }
  
      // validation stage
      if (this.validationStage) {
        const { error } = this.validationStage();
        if (error) {
          return this.handleError(error);
        }
      }

      // dupe check stage
      const { isDupe, error } = this.dupeCheckStage();
      if (isDupe) {
        return this.handleError(error)
      }

      // make request
      await request.add(this.body);

      // format response stage
      const response = this.formatResponse(this.body);
			return createResponse(201, response)
    } catch (error) {
      return createResponse(500, { error: error.message });
    }
  }
}