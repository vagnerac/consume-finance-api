import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Accounts from '../pages/Accounts';
import Account from '../pages/Account';
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import Register from '../pages/Register';
import Transactions from '../pages/Transactions';
import Transaction from '../pages/Transaction';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Transactions} isClosed={false} />
      <MyRoute
        exact
        path="/transaction/:id/edit"
        component={Transaction}
        isClosed
      />
      <MyRoute exact path="/transaction/" component={Transaction} isClosed />
      <MyRoute exact path="/categories/" component={Categories} isClosed />
      <MyRoute exact path="/category/:id/edit" component={Category} isClosed />
      <MyRoute exact path="/category/" component={Category} isClosed />
      <MyRoute exact path="/accounts/" component={Accounts} isClosed />
      <MyRoute exact path="/account/:id/edit" component={Account} isClosed />
      <MyRoute exact path="/account/" component={Account} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
