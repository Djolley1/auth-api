'use strict';

require('dotenv').config();
const { db } = require('./api-server/src/models');
const app = require('./api-server/src/server.js');
const PORT = process.env.PORT || 3001

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});