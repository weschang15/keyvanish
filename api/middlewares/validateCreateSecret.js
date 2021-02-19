const yup = require("yup");
const { getErrors } = require("../../shared/utils/getErrors");

const schema = yup.object().shape({
  content: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  expiration: yup.number(),
});

exports.validateCreateSecret = async function (req, res, next) {
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    return next();
  } catch (error) {
    return res.status(400).json({
      timestamp: new Date(Date.now()),
      message: "Validation error.",
      errors: getErrors(error),
    });
  }
};
