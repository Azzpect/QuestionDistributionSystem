const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const webpageRouter = require("./routes/webpages");
const authRouter = require("./routes/auth");
const { adminFormSubmit } = require("./middlewares/admin");
const { internalErrorHandler, fileTypeFilter, checkFiles } = require("./utilities/functions");

const app = express();
const port = process.env.PORT;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "data/");
    },
    filename: function(req, file, cb) {
        cb(null, "questions.json");
    }
})

const upload = multer({storage: storage, fileFilter: fileTypeFilter}); 
checkFiles();

//middleware configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, "../web/public")));
app.use("/", webpageRouter);
app.use("/auth", authRouter);

app.post("/admin/panel/form-submit", upload.single("questions"), adminFormSubmit, internalErrorHandler, (req, res) => {
    const response = req.body.response;
    res.status(response.code);
    res.json(response.body);
})


app.listen(port, () => {
    console.log("server started");
})