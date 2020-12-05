import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import "./App.css";

import Recipes from "./components/Recipes";
import { collectIdsAndDocs } from "./utilities";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection("recipes").get();

      const recipes = snapshot.docs.map(collectIdsAndDocs);

      setRecipes(recipes);
    };

    fetchData();
  }, []);

  const handleCreate = async (recipe) => {
    // Get the collection from firebase again but add  recipe this time//
    const docRef = await firestore.collection("recipes").add(recipe);
    const doc = await docRef.get();

    // Set the new recipe from firebase store as an {} //
    const newRecipe = collectIdsAndDocs(doc);

    // Set the new recipe {} into state for displaying to user //
    setRecipes([newRecipe, ...recipes]);
  };

  const handleRemove = async (id) => {
    const allRecipes = recipes;

    // removes current post from firestore db //
    await firestore.doc(`recipes/${id}`).delete();

    const updatedRecipes = allRecipes.filter((recipe) => recipe.id !== id);

    setRecipes(updatedRecipes);
  };

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Recipes
        recipes={recipes}
        onCreate={handleCreate}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default App;
