'use strict';

import express from 'express';
import controller from './withings.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);

module.exports = router;