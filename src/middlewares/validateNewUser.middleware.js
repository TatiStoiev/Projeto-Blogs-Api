const { mapStatusHttp } = require('../utils/mapStatusHttp');

const validateNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
    
  const status = 'INVALID_VALUE';

  if (displayName.length < 8) {
    return res.status(mapStatusHttp(status))
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);
  if (!isEmailValid) {
    return res.status(mapStatusHttp(status)).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(mapStatusHttp(status))
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = {
  validateNewUser,
};
