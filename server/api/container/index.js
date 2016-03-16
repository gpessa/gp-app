'use strict';

var express = require('express');
var controller = require('./container.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);
router.get('/:_id', auth.isAuthenticated(), controller.show);
router.put('/:_id', auth.isAuthenticated(), controller.update);
router.delete('/:_id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
