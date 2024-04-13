const jwt = require('jsonwebtoken');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const secret = process.env.JWT_SECRET;

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

const ValidateToken = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    const status = 'NOT_FOUND';
    return res.status(mapStatusHttp(status)).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded) {
      req.user = decoded.data;
      next();
    }
  } catch (error) {
    const status = 'EXPIRED_OR_INVALID';
    return res.status(mapStatusHttp(status)).json({ message: 'Expired or invalid token' });
  }  
};

module.exports = {
  ValidateToken,
};