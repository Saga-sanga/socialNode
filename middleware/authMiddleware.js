const jwt = require("jsonwebtoken");
// const User = require("../models/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

async function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    const result = await jwt.verify(token, JWT_SECRET).catch((err) => {
      console.log(err);
      res.json({ redirect: "/login" });
    });
    if (result) {
      next();
    }
  } else {
    res.json({ redirect: "/login" });
  }
}

// async function checkUser(req, res, next) {
//   const token = req.cookies.token;

//   if (token) {
//     const result = await jwt.verify(token, JWT_SECRET).catch((err) => {
//       console.log(err);
//       // append null user data to res
//       next();
//     });

//     if (result) {
//       const user = await User.findById(result.sub).transform(res => {
//         res.password = undefined;
//         return res;
//       }).catch(err => {
//         console.log(err);
//       });
//       // append user data to res
//       next();
//     }
//   } else {
//     // append null user data to res
//     next();
//   }
// }

module.exports = { requireAuth };
