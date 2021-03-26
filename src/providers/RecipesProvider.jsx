import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { children } = props;

  useEffect(() => {
    let unsubscribeFromFireStore = null;
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
    };

    fetchData();

    // "clean up" previously done with componentWillUnmount() to prevent memory leak //
    return () => {
      unsubscribeFromFireStore();
    };
  }, [children]);

  return (
    <RecipesContext.Provider value={recipes}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
