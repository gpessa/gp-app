'use strict';

import express from 'express';
import controller from './withings.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/limit/:limit*?', auth.isAuthenticated(), controller.index);

module.exports = router;
