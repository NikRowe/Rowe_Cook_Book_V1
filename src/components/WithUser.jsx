import React from "react";
import { UserContext } from "../providers/UserProvider";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

// Takes a component adds the user data + componenets existing props together.
const WithUser = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <UserContext.Consumer>
        {(user) => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };

  WrappedComponent.displayName = `WithUser(${getDisplayName(
    WrappedComponent
  )})`;

  return WrappedComponent;
};

export default WithUser;
