'use strict';

import express from 'express';
import passport from 'passport';
import * as auth from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: true,
    passReqToCallback: true
  }))
  .get('/connect', auth.isAuthenticated(), function (req, res, next) {
    passport.authenticate('facebook', {
      scope: ['email', 'user_about_me'],
      session: false,
      state: JSON.stringify(req.user)
    })(req, res, next)
  })
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: true,
    passReqToCallback: true
  }), auth.setTokenCookie);

export default router;
