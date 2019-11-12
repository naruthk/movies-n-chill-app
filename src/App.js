import React from 'react';

import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppProvider from "./components/app-context/AppContext"; 

import Home from "./pages/Home";
import News from "./pages/News";
import Details from "./pages/Details";
import NotFound from './pages/NotFound';

import dotenv from 'dotenv';
dotenv.config();

const App = () => {
  return (
    <AppProvider>
      <Router history={createBrowserHistory({})}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:movieId" component={Details} />
          <Route exact path="/news" component={News} />
          <Route path="*" component={NotFound} status={404} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
