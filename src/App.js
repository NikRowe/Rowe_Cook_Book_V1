import React from "react";
import "./App.css";

import Recipes from "./components/Recipes";
import Authentication from "./components/Authentication";
import UserProfile from "./components/UserProfile";

import { Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Link to="/">
        <h1>Rowe Cook Book</h1>
      </Link>
      <Authentication />
      <Switch>
        <Route exact path="/" component={Recipes} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
    </div>
  );
};

export default App;
