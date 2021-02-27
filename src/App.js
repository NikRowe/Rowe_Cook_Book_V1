import React, { useEffect, useState } from "react";
import { firestore, auth } from "./firebase";
import "./App.css";

import Recipes from "./components/Recipes";
import { collectIdsAndDocs } from "./utilities";
import Authentication from "./components/Authentication";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromFireStore = null;
    let unsubscribeFromAuth = null;

    /* gets firebase store data and subscribes via onSnapshot() then sets to state for visualization - this will use more api calls as it is calling the API and updating the app anytime this FB collection is being changed. 
    
    You can totally use .get() instead of .onSnapshot() and manually setState() so that the api is only called upon refreshing the page to reduce our API calls. 
    */
    const fetchData = async () => {
      unsubscribeFromFireStore = firestore
        .collection("recipes")
        .onSnapshot((snapshot) => {
          const recipes = snapshot.docs.map(collectIdsAndDocs);
          setRecipes(recipes);
        });

      unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
        setUser({ user });
      });

      unsubscribeFromAuth();
    };

    fetchData();

    // "clean up" previously done with componentWillUnmount() to prevent memory leak //
    return () => {
      unsubscribeFromFireStore();
    };
  }, []);

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Authentication user={user} />
      <Recipes recipes={recipes} />
    </div>
  );
};

export default App;
