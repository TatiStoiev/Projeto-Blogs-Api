const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ error: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token not found' });
  }  
};