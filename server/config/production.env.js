'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'https://gp-app.herokuapp.com',
  SESSION_SECRET: 'gpapp-secret',

  FACEBOOK_ID: '498987300273296',
  FACEBOOK_SECRET: '63576130736fc2c732ab3036845c5f8f',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: '908550571487-cus5el90152503es9ihmfoq4gr72gafg.apps.googleusercontent.com',
  GOOGLE_SECRET: 'yKuKkga924jnhvrur1Js9bo2',

  WITHINGS_ID : '490e26fd06b895161b3158d72d5c7756c9d7d0d908b1411c8cc5f8d12eee9',
  WITHINGS_SECRET : '64e897c97e28d96d4083c937645d4068e550313be5d1d76f7877531f55',

  FORECAST_SECRET : 'd6c8819cafcd52ab7f45ae6e20a5e64d',

  // Control debug level for modules using visionmedia/debug
  DEBUG: 'app:log'
};
