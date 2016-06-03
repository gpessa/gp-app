/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/items', require('./api/item'));
  app.use('/api/pages', require('./api/pages'));
  app.use('/api/forecast', require('./api/forecast'));
  app.use('/api/positive-things', require('./api/positive-thing'));
  app.use('/api/balances', require('./api/balance'));
  app.use('/api/portfolios', require('./api/portfolio'));
  app.use('/api/todo-list', require('./api/todo-list'));
  app.use('/api/buienradar', require('./api/buienradar'));
  app.use('/api/cigarette', require('./api/cigarette'));
  app.use('/api/withings', require('./api/withings'));
  app.use('/api/stock', require('./api/stock'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
