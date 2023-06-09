import loadable from '@loadable/component';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  return <Switch>
    <Redirect exact path='/' to='login'/>
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={SignUp} />
    <Route path='/workspace' component={Workspace} />
  </Switch>;
};

export default App;
