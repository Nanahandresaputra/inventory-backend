const express = require("express");
const costumersController = require("./controller");
const upload = require("../../utils/utils");

const router = express.Router();

router.get("/costumers", costumersController.index);
router.get("/costumers/:id", costumersController.indexOne);
router.post("/costumers", upload, costumersController.store);
router.put("/costumers/:id", upload, costumersController.update);
router.delete("/costumers/:id", costumersController.destroy);

module.exports = router;
