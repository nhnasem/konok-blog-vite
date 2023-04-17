const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const postRoute = require("./routes/postRoute");

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoute);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port = process.env.PORT || 3500;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
