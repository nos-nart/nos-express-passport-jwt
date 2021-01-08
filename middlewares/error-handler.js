const { logger } = require('../config/logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  res.status(error.status || 500);
  res.json({
    message: error.message,
    extra: error.extra,
    errors: error
  });
  res.end();
}

module.exports = { errorHandler };
