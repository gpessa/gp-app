'use strict';

var express = require('express');
var controller = require('./item.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:_id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:_id', auth.isAuthenticated(), controller.update);
router.patch('/:_id', auth.isAuthenticated(), controller.update);
router.delete('/:_id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
