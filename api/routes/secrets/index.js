const { Router } = require("express");
const SecretsController = require("../../controllers/secrets/SecretsController");

const router = Router();

router.get("/:id", SecretsController.getSecret);
router.post("/", SecretsController.createSecret);

module.exports = router;
