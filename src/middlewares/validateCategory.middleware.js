const { mapStatusHttp } = require('../utils/mapStatusHttp');

const validateNameCategory = (req, res, next) => {
  const { name } = req.body;
    
  const status = 'INVALID_VALUE';

  if (!name || name === '') {
    return res.status(mapStatusHttp(status))
      .json({ message: '"name" is required' });
  }
  next();
};

module.exports = {
  validateNameCategory,
};
