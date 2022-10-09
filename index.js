require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 4141;

const userRoutes = require("./routes/user");

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
