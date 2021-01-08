require('dotenv').config();
const express = require('express');
const connectDB = require('./services/db');
const expressPino = require('express-pino-logger');
const { config } = require('./config');
const { logger } = require('./services/logger');
const { errorHandler } = require('./middlewares/error-handler');

const HOUR = 1000 * 60 * 60;
const app = express();

const expressLogger = expressPino({
  logger,
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLogger);
// Error handling
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    })
  })
  .catch((err) => {
    console.log(`Can't connect to mongo`);
  })
