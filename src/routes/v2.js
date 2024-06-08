'use strict';

const express = require('express');
const v2Router = express.Router();

const bearerAuth = require('../auth/middleware/bearer.js');
const acl = require('../auth/middleware/acl.js');

v2Router.get('/', bearerAuth, handleGetV2);
v2Router.post('/', bearerAuth, acl('create'), handlePostV2);
v2Router.put('/:id', bearerAuth, acl('update'), handlePutV2);
v2Router.delete(':id', bearerAuth, acl('delete'), handleDeleteV2);

async function handleGetV2(req, res, next) {
    try {
      // Your logic to handle GET request for /api/v2/
      res.status(200).send('GET request for /api/v2/');
    } catch (error) {
      next(error);
    }
  }
  
  async function handlePostV2(req, res, next) {
    try {
      // Your logic to handle POST request for /api/v2/
      res.status(201).send('POST request for /api/v2/');
    } catch (error) {
      next(error);
    }
  }
  
  async function handlePutV2(req, res, next) {
    try {
      // Your logic to handle PUT request for /api/v2/:id
      const id = req.params.id;
      res.status(200).send(`PUT request for /api/v2/${id}`);
    } catch (error) {
      next(error);
    }
  }
  
  async function handleDeleteV2(req, res, next) {
    try {
      // Your logic to handle DELETE request for /api/v2/:id
      const id = req.params.id;
      res.status(200).send(`DELETE request for /api/v2/${id}`);
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = v2Router;