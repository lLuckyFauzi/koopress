const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const tokenHeaders = req.headers.authorization;
  if (!tokenHeaders) {
    return res.status(404).json({
      message: "User not found, Please register first",
    });
  }

  const user = jwt.decode(tokenHeaders, process.env.TOKEN);
  if (!user) {
    res.status(404).json({
      message: "User Not Found!",
    });
  }
  req.payload = user;
  next();
};

module.exports = {
  middleware,
};
