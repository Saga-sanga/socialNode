const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Post = require("./models/post");
const app = express();
const authRoutes = require("./routers/authRoutes");
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



const corsOptions = {
  origin: "*",
}

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({corsOptions})
);

app.use("/auth", authRoutes);

app.post("/post/create", async (req, res) => {
  const post = new Post(req.body);

  const result = await post.save().catch((err) => console.log(err));
  res.json(result);
});

app.use((req, res) => {
  console.log(req.body);
  res.status(404).json({ message: "Resource not found!" });
});
