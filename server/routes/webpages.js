const express = require("express");
const path = require("path");


const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../web/index.html"));
})

router.get("/admin", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../web/admin.html"));
})

router.get("/student", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../web/student.html"));
})

module.exports = router;