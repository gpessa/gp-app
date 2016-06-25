'use strict';

var express = require('express');
var controller = require('./buienradar.controller');

var router = express.Router();

router.get('/latitude/:latitude/longitude/:longitude', controller.index);

module.exports = router;
