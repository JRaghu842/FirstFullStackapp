let express = require("express");
let userRouter = express.Router();
let { UserModel } = require("../model/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

// registration
userRouter.post("/register", async (req, res) => {
  let { email, pass, location, age } = req.body;
  try {
    bcrypt.hash(pass, 4, async (err, hash) => {
      let user = new UserModel({ email, pass: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registeration has been done" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "login successful",
            token: jwt.sign({ userID: user[0]._id }, "meat"),
          });
        } else {
          res.status(400).send({ msg: "Wrong password" });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong email/email not registered" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// userRouter.get("/details", (req, res) => {
//   let token = req.headers.authorization;
//   jwt.verify(token, "meat", (err, decoded) => {
//     decoded
//       ? res
//           .status(200)
//           .send(
//             "You have succesfully opened Restricted route DETAILS using correct token"
//           )
//       : res.status(400).send({ msg: err.message });
//   });
// });

// userRouter.get("/moviedata", (req, res) => {
//   let token = req.headers.authorization;
//   jwt.verify(token, "meat", (err, decoded) => {
//     decoded
//       ? res
//           .status(200)
//           .send(
//             "You have succesfully opened Restricted route MovieData using correct token"
//           )
//       : res.status(400).send({ msg: err.message });
//   });
// });

module.exports = {
  userRouter,
};
