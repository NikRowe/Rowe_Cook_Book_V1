import React, { useState } from "react";

const AddRecipe = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "title" ? setTitle(value) : setContent(value);
  };

  const handleSubmit = (e, onCreate) => {
    e.preventDefault();

    const recipe = {
      id: Date.now().toString(),
      title,
      content,
      ingredients: ["1/2 Cup Sugar", "1 Apple", "1 Sheet Puff Pastry"],
      instructions: ["Preheat Oven to 350", "Let Pasty thaw at room temp"],
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
        placeholder="Body"
        value={content}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Recipe" />
    </form>
  );
};

export default AddRecipe;
