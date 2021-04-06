import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

import { withRouter } from "react-router-dom";

const RecipePage = (props) => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);

  let recipeId = props.match.params.id;
  let recipeRef = firestore.doc(`recipes/${recipeId}`);
  let commentsRef = recipeRef.collection("comments");

  useEffect(() => {
    let unsubscribeFromRecipe = null;
    let unsubscribeFromComments = null;

    const fetchData = async () => {
      unsubscribeFromRecipe = recipeRef.onSnapshot((snapshot) => {
        const recipe = collectIdsAndDocs(snapshot);
        setRecipe(recipe);
      });

      unsubscribeFromComments = commentsRef.onSnapshot((snapshot) => {
        const comments = snapshot.docs.map(collectIdsAndDocs);
        setComments(comments);
      });
    };

    fetchData();

    return () => {
      unsubscribeFromRecipe();
      unsubscribeFromComments();
    };
  });

  return (
    <section>
      {recipe && <Recipe {...recipe} />}
      <Comments comments={comments} onCreate={() => {}} />
    </section>
  );
};

export default withRouter(RecipePage);
