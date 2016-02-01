'use strict';

import express from 'express';
import passport from 'passport';
import * as auth from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: true
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: true
  }), auth.setTokenCookie);

export default router;
