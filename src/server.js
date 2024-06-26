'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRoutes = require('./auth/routes.js');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: (port) => {
      app.listen(port, () => {
        console.log(`Server Up on ${port}`);
      });
    },
  };