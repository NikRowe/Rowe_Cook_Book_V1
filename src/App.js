import React from "react";
import "./App.css";

import Recipes from "./components/Recipes";
import Authentication from "./components/Authentication";

const App = () => {
  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Authentication />
      <Recipes />
    </div>
  );
};

export default App;
