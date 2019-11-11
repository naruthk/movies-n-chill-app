import React from 'react';

import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from "./pages/Home";

import dotenv from 'dotenv';
dotenv.config();

const App = () => {

  return (
    <Router history={createBrowserHistory({})}>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/list" component={Home} />
        <Route exact path="/list/:movieid" component={Details} />
        <Route exact path="/about" component={About} />
        <Route exact path="/faq" component={Faq} />
        <Route path="*" component={NotFound} status={404} /> */}
      </Switch>
    </Router>
  );
}

export default App;
