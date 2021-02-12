const { Router } = require("express");
const SecretsController = require("../../controllers/secrets/SecretsController");

const router = Router();

router.get("/secrets/:id", SecretsController.getSecret);
router.post("/secrets", SecretsController.createSecret);

module.exports = router;
