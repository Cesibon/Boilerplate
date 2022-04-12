require('dotenv').config();
global.__basedir = __dirname;

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');

const api = require('@app/routes');
const app = express();

// const session = require('express-session');
// app.use(session({
//   secret: 'ssshhhhh',
//   saveUninitialized: true,
//   resave: true
// }));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.text());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;