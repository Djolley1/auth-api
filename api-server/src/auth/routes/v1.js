'use strict';

const express = require('express');
const dataModules = require('../models/user.js');
const bearerAuth = require('../middleware/bearer.js');
const acl = require('../middleware/acl.js');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.get('/secret', bearerAuth, acl('read'), handleGetSecret);
router.get('/users', bearerAuth, acl('delete'), handleGetUsers);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

async function handleGetSecret(req, res, next) {
  try {
    res.status(200).send('Welcome to the secret area');
  } catch (error) {
    next(error);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    // Retrieve user records (assuming it's coming from the auth server models)
    const userRecords = await users.findAll({});
    // Extract usernames from user records
    const usernames = userRecords.map(user => user.username);
    // Send the list of usernames
    res.status(200).json(usernames);
  } catch (error) {
    next(error);
  }
}
module.exports = router;