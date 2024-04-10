const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email === '' || !password || password === '') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  loginMiddleware,
};