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



module.exports = { internalErrorHandler, fileTypeFilter }