require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const InternalError = require('./utils/errors/InternalError');
const Routers = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

const limiter = require('./utils/limiter');

const options = {
  origin: [
    'http://localhost:3000',
    'http://metel.nomorepartiesxyz.ru',
    'https://metel.nomorepartiesxyz.ru',
  ],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  preflightContinue: false,
  credentials: true,
};

mongoose.connect(config.serverDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Mongo is ON'))
  .catch((err) => console.log(err.message));

app.use(cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use(Routers);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  next(new InternalError(err.message));
});

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порте`);
});
