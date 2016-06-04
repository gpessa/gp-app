'use strict';

var express = require('express');
var controller = require('./pages.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.show);
router.put('/:id/', auth.isAuthenticated(), controller.show);

module.exports = router;
