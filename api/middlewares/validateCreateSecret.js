const yup = require("yup");
const { getErrors } = require("../../shared/utils/getErrors");
const { getMsFromMins, getMsFromDays } = require("../../shared/utils/time");

const schema = yup.object().shape({
  content: yup.string().required().label("Content"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  expiration: yup
    .number()
    .oneOf(
      [
        getMsFromMins(15),
        getMsFromMins(30),
        getMsFromDays(1),
        getMsFromDays(7),
      ],
      "Expiration must be 15 minutes, 30 minutes, 60 minutes, 1 day, or 7 days"
    )
    .default(getMsFromDays(1)),
});

exports.validateCreateSecret = async function (req, res, next) {
  try {
    const params = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    req.body = { ...req.body, ...params };

    return next();
  } catch (error) {
    const errors = getErrors(error);
    const count = Object.keys(errors).length;
    return res.status(400).json({
      timestamp: new Date(Date.now()),
      message:
        count > 1
          ? `${count} errors have occurred`
          : `${count} error has occurred`,
      errors,
    });
  }
};
