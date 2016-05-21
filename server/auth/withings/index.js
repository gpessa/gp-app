'use strict';

import express from 'express';
import passport from 'passport';
import * as auth from '../auth.service';

var router = express.Router();

router
  .get('/connect', passport.authenticate('withings', {
    scope: [],
    failureRedirect: '/signup',
    session: true,
    passReqToCallback: true
  }))
  .get('/callback', auth.isAuthenticated(), passport.authorize('withings', {
    failureRedirect: '/signup',
    session: true,
    passReqToCallback: true
  }), auth.setTokenCookie);

export default router;
