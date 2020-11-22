import React from "react";

const Recipe = ({
  title,
  contents,
  ingredients,
  instructions,
  stars,
  comments,
  image,
  user,
}) => {
  return (
    <article className="recipe">
      <div className="recipe--content">
        <h3>{title}</h3>
        <img src={image} alt="meal" />
        {ingredients.map((ingredient, i) => (
          <ul key={i}>
            <li>{ingredient}</li>
          </ul>
        ))}
        <ol>
          {instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
        <div>{contents}</div>
      </div>
      <div className="recipe--meta">
        <div>
          <p>
            <span role="img" aria-label="fork and knife with plate">
              🍽
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🧁
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
        </div>
        <div>
          <button className="star">Star</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    </article>
  );
};

Recipe.defaultProps = {
  title: "A meal everyone will love!",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  ingredients: ["1/2 Cup Sugar", "1 Apple", "1 Sheet Puff Pastry"],
  instructions: ["Preheat Oven to 350", "Let Pasty thaw at room temp"],
  image: "https://www.fillmurray.com/300/300",
  user: {
    id: "123",
    displayName: "Thomas Jefferson",
    email: "TommyJ@mailinator.com",
    photoURL: "https://www.fillmurray.com/300/300",
  },
  stars: 0,
  comments: 0,
};

export default Recipe;
