/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/positive-things', require('./api/positive-thing'));
  app.use('/api/balances', require('./api/balance'));
  app.use('/api/portfolios', require('./api/portfolio'));
  app.use('/api/widget-container', require('./api/widget-container'));
  app.use('/api/shopping-list', require('./api/shopping-list'));
  app.use('/api/buienradar', require('./api/buienradar'));
  app.use('/api/cigarette', require('./api/cigarette'));
  app.use('/api/withings', require('./api/withings'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/widget', require('./api/widget'));
  app.use('/api/stock', require('./api/stock'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
