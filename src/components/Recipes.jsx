import React from "react";
import Recipe from "./Recipe";
import AddRecipe from "./AddRecipe";

const Recipes = ({ recipes, onCreate }) => {
  console.log("recipes :", recipes);
  return (
    <section className="Recipes">
      <AddRecipe onCreate={onCreate} />
      {recipes.map((recipe) => (
        <Recipe {...recipe} key={recipe.id} />
      ))}
    </section>
  );
};

export default Recipes;
