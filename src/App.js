import React, {Component} from 'react';
import './App.css';
import Login from './login';
import Dashboard from './dashboard';
import Register from './register';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return(
    <BrowserRouter>
   <Switch>
     <Route path='/login' component={Login}/>
     <Route path='/register' component={Register}/>
     <Route path='/' component={Dashboard}/>
   </Switch>
   </BrowserRouter>
)
}

export default App;
