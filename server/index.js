const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const webpageRouter = require("./routes/webpages");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT;

//middleware configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/public", express.static(path.join(__dirname, "../web/public")));
app.use("/", webpageRouter);
app.use("/auth", authRouter);




app.listen(port, () => {
    console.log("server started");
})