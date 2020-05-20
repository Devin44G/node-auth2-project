import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import RegLogin from './components/RegLogin';
import Dashboard from './components/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Route path="/reg-login" component={RegLogin} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
