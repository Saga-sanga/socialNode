const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

// Functions
function createToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      iat: parseInt(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
    .lean()
    .catch((err) => console.log(err));

  if (user) {
    const result = await bcrypt
      .compare(password, user.password)
      .catch((err) => console.log(err));
    delete user.password;

    if (result) {
      const token = createToken(user);
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({ user });
    } else {
      res.json({ password: "Incorrect Password" });
    }
  } else {
    res.json({ email: "Unable to find User" });
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: {
      first: req.body.firstname,
      last: req.body.lastname,
    },
    email: req.body.email,
    password: req.body.password,
  });

  const result = await User.findOne({ email: req.body.email });
  // let response = "User already exists";

  if (!result) {
    const response = await user.save().catch((err) => console.log(err));
    const token = createToken(response);
    console.log("Log", response);
    res.status(200).cookie("token", token, {
      httpOnly: true,
    });
  }

  if (result) {
    console.log(result);
    res.json({ error: "User already exists" });
  }
});

module.exports = router;
