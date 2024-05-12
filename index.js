'use strict';

require('dotenv').config();
const { db } = require('./api-server/src/auth/models');
const app = require('./api-server/src/server.js');
const PORT = process.env.PORT || 3001

db.sync().then(() => {
  app.start(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});