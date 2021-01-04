import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import "./App.css";

import Recipes from "./components/Recipes";
import { collectIdsAndDocs } from "./utilities";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let unsubscribe = null;

    /* gets firebase store data and subscribes via onSnapshot() then sets to state for visualization - this will use more api calls as it is calling the API and updating the app anytime this FB collection is being changed. 
    
    You can totally use .get() instead of .onSnapshot() and manually setState() so that the api is only called upon refreshing the page to reduce our API calls. 
    */
    const fetchData = async () => {
      unsubscribe = firestore.collection("recipes").onSnapshot((snapshot) => {
        const recipes = snapshot.docs.map(collectIdsAndDocs);
        setRecipes(recipes);
      });
    };

    fetchData();

    // "clean up" previously done with componentWillUnmount() to prevent memory leak //
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Recipes recipes={recipes} />
    </div>
  );
};

export default App;
