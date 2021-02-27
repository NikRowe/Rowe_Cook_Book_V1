import React from "react";

import CurrentUser from "./CurrentUser";
import SignInAndUp from "./SignInAndUp";

const Authentication = ({ user, loading }) => {
  if (loading) return null;

  return <div>{user ? <CurrentUser {...user} /> : <SignInAndUp />}</div>;
};

export default Authentication;
