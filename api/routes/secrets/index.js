const { Router } = require("express");
const SecretsController = require("../../controllers/secrets/SecretsController");
const {
  validateCreateSecret,
} = require("../../middlewares/validateCreateSecret");

const router = Router();

router.get("/:id", SecretsController.getSecret);
router.post("/", validateCreateSecret, SecretsController.createSecret);

module.exports = router;
