'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/routes.js')

const v1Routes = require('./routes/v1.js');

const app = express();

app.use(express.json());

app.use(logger);
app.use('/auth', authRoutes);

app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = app;