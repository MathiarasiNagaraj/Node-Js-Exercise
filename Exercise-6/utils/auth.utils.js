const jwt = require("jsonwebtoken");
const getJWTAccessToken = (user) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_SECERET_TOKEN, {
    expiresIn: "30m",
  });
  return accessToken;
};
const getJWTRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, {
    expiresIn: "1d",
  });
  return refreshToken;
};
const verifyJWTToken = (req, res) => {
  const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.send(401).send({'message':'Token Expired'})
      }
    else {
        const token = authHeader.split(" ")[1];
        const data = jwt.verify(token, process.env.ACCESS_SECERET_TOKEN);
        return data.userName;
    }
};
module.exports = {
  getJWTAccessToken,
  getJWTRefreshToken,
  verifyJWTToken,
};
