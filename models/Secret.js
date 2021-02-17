const { createModel, createSchema } = require("./utils");
const { getMsFromMins } = require("../shared/utils/time");

const schema = createSchema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    min: [8, "Password must be at least 8 characters long."],
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
});

module.exports = createModel("Secret", schema);
