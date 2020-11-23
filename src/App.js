import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import "./App.css";

import Recipes from "./components/Recipes";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection("recipes").get();

      const recipes = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setRecipes(recipes);
    };

    fetchData();
  }, []);

  const handleCreate = (recipe) => {
    setRecipes([recipe, ...recipes]);
  };

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Recipes recipes={recipes} onCreate={handleCreate} />
    </div>
  );
};

export default App;
