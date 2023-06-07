const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/auth/login", (req, res) => {
  console.log(req, res)
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
