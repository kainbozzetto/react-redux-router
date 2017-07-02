import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import asyncRoute from './asyncRoute';

const Home = asyncRoute(() => import('./Home'));
const Count = asyncRoute(
  () => import('./Count'),
  () => import('../reducers/count')
);
const User = asyncRoute(
  () => import('./User'),
  () => import('../reducers/user')
)

export default class App extends React.Component {
  render() {
    const navStyle = {
      margin: '10px 5px',
    };

    return (
      <div>
        <nav>
          <Link to='/' style={navStyle}>Home</Link>
          <Link to='/count' style={navStyle}>Count</Link>
          <Link to='/user' style={navStyle}>User</Link>
        </nav>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/count' component={Count} />
          <Route path='/user' component={User} />
        </Switch>
      </div>
    );
  }
}
