'use strict';

var express = require('express');
var controller = require('./balance.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.put('/:id', auth.isAuthenticated(), controller.update);

module.exports = router;