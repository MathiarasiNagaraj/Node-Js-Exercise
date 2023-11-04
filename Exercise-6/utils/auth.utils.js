const jwt = require('jsonwebtoken');
const getJWTAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_SECERET_TOKEN, { expiresIn: '30m' });
    return accessToken;
}
const getJWTRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, { expiresIn: '1d' });
    return refreshToken;
    
}
const verifyJWTToken=(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_SECERET_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    );
}
module.exports = {
    getJWTAccessToken,
    getJWTRefreshToken,
    verifyJWTToken
}