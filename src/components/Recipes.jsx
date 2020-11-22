import React from "react";
import Recipe from "./Recipe";

const Recipes = ({ recipes, onCreate }) => {
  //   console.log("recipes :", recipes);
  return (
    <section className="Recipes">
      {recipes.map((recipe) => (
        <Recipe {...recipe} key={recipe.id} />
      ))}
    </section>
  );
};

export default Recipes;
