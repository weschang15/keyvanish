const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

function createSchema(definition = {}, options = {}) {
  return new Schema(definition, { timestamps: true, ...options });
}

function createModel(modelName, modelSchema) {
  return mongoose.model(modelName, modelSchema);
}

module.exports = {
  Types,
  Schema,
  createSchema,
  createModel,
};
