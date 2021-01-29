const express = require('express');
const router = express.Router();
const db = require('../knex/knex.js');
const { body } = require('express-validator');

router.post('/', createUser);

module.exports = router;
