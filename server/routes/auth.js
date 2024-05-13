const express = require("express");
const path = require("path");
const { adminAuth } = require("../middlewares/admin");


const router = express.Router();

router.post("/admin", adminAuth,(req, res) => {
    const response = req.body.response;
    res.status = response.code;
    delete response.code;
    res.send(response);
})

module.exports = router;