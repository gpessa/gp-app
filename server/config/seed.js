/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

/**

**/

import Balance from '../api/balance/balance.model';
import Cigarette from '../api/cigarette/cigarette.model';
import TodoList from '../api/todo-list/todo-list.model';
import Stock from '../api/stock/stock.model';
import User from '../api/user/user.model';
import Widget from '../api/widget/widget.model';


// Balance.find({}).removeAsync();
// WidgetContainer.find({}).removeAsync();
// Balance.find({}).removeAsync();
// Cigarette.find({}).removeAsync();
// ShoppingList.find({}).removeAsync();
// Stock.find({}).removeAsync();
// User.find({}).removeAsync();
// Widget.find({}).removeAsync();
//
// User.find({}).removeAsync()
//   .then(() => {
//     User.createAsync({
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'nomeecognome@gmail.com',
//       password: 'password'
//     })
//     .then(() => {
//       console.log('finished populating users');
//     });
//   });
