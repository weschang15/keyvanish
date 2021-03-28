const { ValidationError: YupValidationError } = require("yup");

exports.getErrors = function (err) {
  if (err instanceof YupValidationError) {
    return err.inner.reduce((acc, { path: param, message }) => {
      return { ...acc, [param]: { param, message } };
    }, {});
  }

  if (err instanceof Error) {
    return [
      { path: "unknown", message: err.message || "Something went wrong." },
    ];
  }
};
