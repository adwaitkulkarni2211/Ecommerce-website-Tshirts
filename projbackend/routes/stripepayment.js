const { makePayment } = require("../controllers/stripepayment");
const express = require("express");
const router = express.Router();

router.post("/stripepayment", makePayment);

module.exports = router;
