import React from 'react';

import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppProvider from "./components/app-context/AppContext"; 

import Home from "./pages/Home";
import News from "./pages/News";
import Details from "./pages/Details";
import Compare from "./pages/Compare";
import Interesting from './pages/Interesting';
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
          <Route exact path="/compare" component={Compare} />
          <Route exact path="/news" component={News} />
          <Route exact path="/interesting" component={Interesting} />
          <Route path="*" component={NotFound} status={404} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
