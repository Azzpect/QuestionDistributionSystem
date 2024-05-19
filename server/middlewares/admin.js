function adminAuth(req, res, next) {
    let response = {};
    try {
        const { adminName, adminPassword } = req.body;
        if(adminName == process.env.ADMIN && adminPassword == process.env.PASSWORD)
            response = { code: 200, body: { status: "success", message: "Logged in as admin", token: process.env.ADMIN_ID }};
        else
            response = { code: 401, body: { status: "error", message: "Wrong credentials" }};
    } catch (err) {
        response = { code: 500, body: { status: "error", message: "Internal server error" }};
    }
    req.body.response = response;
    next();
}

function adminFormSubmit(req, res, next) {
    try {
        const { topic, code } = req.body;
        console.log(topic, code);
    } catch (error) {
        console.log(error);
    }
    next();
}

module.exports = { adminAuth, adminFormSubmit };