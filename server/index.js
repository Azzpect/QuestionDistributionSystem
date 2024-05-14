const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const webpageRouter = require("./routes/webpages");
const authRouter = require("./routes/auth");
const { adminFormSubmit } = require("./middlewares/admin");

const app = express();
const port = process.env.PORT;
const upload = multer({upload: "data/"});

//middleware configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/public", express.static(path.join(__dirname, "../web/public")));
app.use("/", webpageRouter);
app.use("/auth", authRouter);

app.post("/admin/panel/form-submit", upload.single("questions"),adminFormSubmit, (req, res) => {
    res.send("hello world");
})


app.listen(port, () => {
    console.log("server started");
})