const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/user");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3020;
const mongoPassword = process.env.MONGO_PW;

const mongoURI = `mongodb+srv://recksonk94:${mongoPassword}@cluster0.qs9y705.mongodb.net/odinSocials?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to Mongodb");

    // Listen only after connected to database
    app.listen(port, () => {
      console.log("Listening on port ", port);
    });
  })
  .catch(console.log);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).catch((err) => console.log(err));

  if (user) {
    const result = await bcrypt
      .compare(password, user.password)
      .catch((err) => console.log(err));
    
    if (result) {
      res.json({ user });
    } else {
      res.json({ error: "Incorrect Password"})
    }
  } else {
    res.json({ error: "User not found" });
  }
});

app.post("/auth/signup", async (req, res) => {
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
    console.log("Log", response);
    response.json({ response });
  }

  if (result) {
    res.json({ error: "User already exists" });
  }
});

app.use((req, res) => {
  console.log(req.body);
  res.status(404).json({ message: "Resource not found!" });
});
