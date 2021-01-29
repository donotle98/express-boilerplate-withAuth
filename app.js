require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./errorHandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    })
);
const morganSetting = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.json('waddup');
});

app.use(errorHandler);
module.exports = app;
