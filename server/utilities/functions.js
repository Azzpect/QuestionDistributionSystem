const fs = require("fs");
const path = require("path");
const { Logger } = require("./logger");

function internalErrorHandler(err, req, res, next) {
    res.status(500);
    res.json({status: "error", message: err.message || "Internal server error."});
}

function fileTypeFilter(req, file, cb) {
    if(file.mimetype === "application/json") {
        req.body.response = {body: {status: "success", message: "File accepted."}}
        cb(null, true);
    }
    else {
        req.body.response = {code: 400, body: {status: "error", message: "Wrong file format. Please provide a json file."}}
        cb(null, false);
    }
}

function checkFileExist(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK); 
        return true;
    } catch (err) {
       return false; 
    }    
}

function checkFiles() {
    if(checkFileExist(path.join(__dirname, "../data/students.json"))) {
        if(checkFileExist(path.join(__dirname, "../data/exam.json"))) {
            Logger.info("All files are ready.");                   
        }
        else{
            Logger.warning("Missing Exam Details file.");
            Logger.info("Creating Exam Details file");
            fs.writeFileSync(path.join(__dirname, "../data/exam.json"), JSON.stringify({"topic": "", "code": "", "time": ""}, null, 2))
        }
    }
    else{
            Logger.error("Missing Student Details file.");
        }
}



module.exports = { internalErrorHandler, fileTypeFilter, checkFiles }