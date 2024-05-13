function adminAuth(req, res, next) {
    let response = {};
    try {
        const { adminName, adminPassword } = req.body;
        if(adminName == process.env.ADMIN && adminPassword == process.env.PASSWORD)
            response = { status: "success", code: 200, message: "Successfully logged in as admin" };
        else
            response = { status: "error", code: 401, message: "Wrong credentials" };
    } catch (err) {
        response = { status: "error", code: 500, message: "Internal server error" };
    }
    req.body.response = response;
    next();
}

module.exports = { adminAuth }