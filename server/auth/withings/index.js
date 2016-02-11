'use strict';

import express from 'express';
import passport from 'passport';
import * as auth from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('withings', {
    scope: [],
    failureRedirect: '/signup',
    session: true,
    passReqToCallback: true
  }))
  .get('/callback', passport.authorize('withings', {
    failureRedirect: '/signup',
    session: true,
    passReqToCallback: true
  }), auth.setTokenCookie);

module.exports = router;
