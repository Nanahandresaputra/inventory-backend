const express = require("express");
const salesController = require("./controller");

const router = express.Router();

router.get("/sales", salesController.index);
router.post("/sales", salesController.store);
router.delete("/sales/:id", salesController.destroy);

module.exports = router;
