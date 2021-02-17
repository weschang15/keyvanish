const { createModel, createSchema } = require("./utils");
const { getMsFromMins } = require("../shared/utils/time");

const schema = createSchema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    expiration: {
      type: Date,
      default: () => Date.now() + getMsFromMins(5),
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { getters: true, virtuals: false } }
);

schema.methods.toJSON = function () {
  return {
    _id: this._id,
    content: this.content,
    expiration: this.expiration,
    used: this.used,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = createModel("Secret", schema);
