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
router.get("/admin/panel/:token", (req, res) => {
    const token = req.params.token;
    if(token === process.env.ADMIN_ID)
        res.status(200).sendFile(path.join(__dirname, "../../web/adminPortal.html"));
    else
        res.status(404).send("Wrong admin id");
})

module.exports = router;