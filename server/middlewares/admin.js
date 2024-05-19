const fs = require("fs");
const path = require("path");
function adminAuth(req, res, next) {
  let response = {};
  try {
    const { adminName, adminPassword } = req.body;
    if (adminName == process.env.ADMIN && adminPassword == process.env.PASSWORD)
      response = {
        code: 200,
        body: {
          status: "success",
          message: "Logged in as admin. Redirecting in 3s.",
          token: process.env.ADMIN_ID,
        },
      };
    else
      response = {
        code: 401,
        body: { status: "error", message: "Wrong credentials" },
      };
  } catch (err) {
    next(new Error());
  }
  req.body.response = response;
  next();
}
function adminFormSubmit(req, res, next) {
  try {
    let prev_res = req.body.response;
    if(prev_res.body.status === "success") {
        const { topic, code, time } = req.body;
        const data = { topic, code, time };
        fs.writeFileSync(
          path.join(__dirname, "../data/exam.json"),
          JSON.stringify(data, null, 2),
          (err) => {
            if (err) next(new Error("Error in writting file."));
          }
        );
        req.body.response = {
          body: {
            status: "success",
            message:
              "Data received. question distribution has started you may leave this window now.",
          },
          code: 201,
        };
    }
    else {
        req.body.response = {
        body: {
            status: "error",
            message: prev_res.body.message
          },
          code:  400
        };
    }
  } catch (error) {
    next(error.message);
  }
  next();
}

module.exports = { adminAuth, adminFormSubmit };
