import React, { useState } from "react";

/* !!!-- THIS WILL EVENTUALLY BE A MODAL --!!! */
const AddRecipe = ({ onCreate }) => {
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
    console.log(content);
  };

  const handleSubmit = (e, onCreate) => {
    e.preventDefault();

    const recipe = {
      id: Date.now().toString(),
      title,
      content,
      ingredients,
      instructions,
      image: "https://www.fillmurray.com/300/300",
      user: {
        id: "123",
        displayName: "Thomas Jefferson",
        email: "TommyJ@mailinator.com",
        photoURL: "https://www.fillmurray.com/300/300",
      },
      plates: 0,
      comments: 0,
    };

    onCreate(recipe);

    setTitle("");
    setContent("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onCreate)} className="AddRecipe">
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
