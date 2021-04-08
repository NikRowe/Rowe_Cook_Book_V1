import React, { Component } from "react";

import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
import Recipe from "./Recipe";

import { withRouter } from "react-router-dom";
import WithUser from "./WithUser";

class RecipePage extends Component {
  state = { Recipe: null, comments: [] };

  get recipeId() {
    return this.props.match.params.id;
  }

  get recipeRef() {
    return firestore.doc(`recipes/${this.recipeId}`);
  }

  get commentsRef() {
    return this.recipeRef.collection("comments");
  }

  unsubscribeFromrecipe = null;
  unsubscribeFromComments = null;

  componentDidMount = async () => {
    this.unsubscribeFromrecipe = this.recipeRef.onSnapshot((snapshot) => {
      const recipe = collectIdsAndDocs(snapshot);
      this.setState({ recipe });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromrecipe();
    this.unsubscribeFromComments();
  };

  createComment = (comment) => {
    const { user } = this.props;
    this.commentsRef.add({
      ...comment,
      user,
    });
  };

  render() {
    const { recipe, comments } = this.state;
    console.log("this.props :", this.props);
    return (
      <section>
        {recipe && <Recipe {...recipe} />}
        <Comments comments={comments} onCreate={this.createComment} />
      </section>
    );
  }
}

export default withRouter(WithUser(RecipePage));
