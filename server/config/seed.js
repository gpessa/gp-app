/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// /**

import User from '../api/user/user.model';
import WidgetContainer from '../api/widget-container/widget-container.model';

WidgetContainer.find({}).removeAsync();

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'nomeecognome@gmail.com',
      password: 'password'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });


// **/
