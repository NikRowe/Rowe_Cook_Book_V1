import React, { useState } from "react";
import { auth, firestore } from "../firebase";

/* !!!-- THIS WILL EVENTUALLY BE A MODAL --!!! */
const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "title"
      ? setTitle(value)
      : name === "content"
      ? setContent(value)
      : name === "ingredients"
      ? setIngredients([value])
      : setInstructions([value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { uid, displayName, email, photoURL } = auth.currentUser;

    const recipe = {
      title,
      content,
      ingredients,
      instructions,
      image:
        "https://cdn.shopify.com/s/files/1/0041/7497/0991/files/New_ELF_Logo_Maroon_Straight_1_2784x.png?v=1551209746",
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      plates: 0,
      comments: 0,
    };

    firestore.collection("recipes").add(recipe);

    setTitle("");
    setContent("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="AddRecipe">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Notes"
        value={content}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredient 1"
        value={ingredients}
        onChange={handleChange}
      />
      <input
        type="text"
        name="instructions"
        placeholder="Instruction 1"
        value={instructions}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Recipe" />
    </form>
  );
};

export default AddRecipe;
