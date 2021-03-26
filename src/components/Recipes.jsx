import React, { useContext } from "react";
import Recipe from "./Recipe";
import AddRecipe from "./AddRecipe";
import { RecipesContext } from "../providers/RecipesProvider";

/* !!!--- THIS GOES THROUGH THE RECIPES ARRAY, COPIES IT AND THEN RENDERS EACH RECIPE */
const Recipes = () => {
  const recipes = useContext(RecipesContext);

  return (
    <section className="Recipes">
      <AddRecipe />
      {recipes.map((recipe) => (
        <Recipe {...recipe} key={recipe.id} />
      ))}
    </section>
  );
};

export default Recipes;
