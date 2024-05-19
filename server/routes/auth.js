const express = require("express");
const path = require("path");
const { adminAuth } = require("../middlewares/admin");
const { internalErrorHandler } = require("../utilities/functions");


const router = express.Router();

router.post("/admin", adminAuth, internalErrorHandler, (req, res) => {
    const response = req.body.response;
    res.status = response.code;
    res.json(response.body);
})

module.exports = router;