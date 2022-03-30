'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { next('Invalid Login'); }

  try {
    let basic = req.headers.authorization.split(' ').pop();
    let [username, pass] = base64.decode(basic).split(':');

    req.user = await users.authenticateBasic(username, pass);
    if (req.user) {
      next();
    } else {
      res.status(403).send('Invalid Login');
    }
  } catch (e) {
    console.error(e);
  }

};

