let jwt = require("jsonwebtoken");
//

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    let decoded = jwt.verify(token, "meat");
    if (decoded) {
      req.body.user = decoded.userID;
      next();
    } else {
      res.status(400).send({ msg: "Why wrong token?" });
    }
  } else {
    res.status(400).send({ msg: "Login first" });
  }
};

module.exports = {
  auth,
};
