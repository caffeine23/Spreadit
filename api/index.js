const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const errorHandler = require("./utils/errorHandler");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Server is up.");
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
