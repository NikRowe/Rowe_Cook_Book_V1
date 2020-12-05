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
    const docRef = await firestore.collection("recipes").add(recipe);
    const doc = await docRef.get();

    const newRecipe = collectIdsAndDocs(doc);

    setRecipes([newRecipe, ...recipes]);
  };

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Recipes recipes={recipes} onCreate={handleCreate} />
    </div>
  );
};

export default App;
