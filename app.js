const express = require("express");
const app = express();
require("dotenv").config();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port ", port);
});