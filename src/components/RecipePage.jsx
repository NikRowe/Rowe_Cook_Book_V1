import React, { useState } from "react";

import Recipe from "./Recipe";
// import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);

  return <div> Post Page ! </div>;
};

export default RecipePage;
