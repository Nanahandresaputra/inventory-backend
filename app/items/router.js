const express = require("express");
const itemsController = require("./controller");
const upload = require("../../utils/utils");

const router = express.Router();

router.get("/items", itemsController.index);
router.get("/items/:id", itemsController.indexOne);
router.delete("/items/:id", itemsController.destroy);
router.post("/items", upload, itemsController.store);
router.put("/items/:id", upload, itemsController.update);

module.exports = router;
