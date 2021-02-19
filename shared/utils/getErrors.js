const { ValidationError: YupValidationError } = require("yup");

exports.getErrors = function (err) {
  if (err instanceof YupValidationError) {
    return err.inner.map(({ path: param, message }) => ({ param, message }));
  }

  if (err instanceof Error) {
    return [
      { path: "unknown", message: err.message || "Something went wrong." },
    ];
  }
};
