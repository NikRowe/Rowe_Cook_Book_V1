import React, { useContext } from "react";

import CurrentUser from "./CurrentUser";
import SignInAndUp from "./SignInAndUp";
import { UserContext } from "../providers/UserProvider";

const Authentication = ({ loading }) => {
  const user = useContext(UserContext);

  if (loading) return null;

  return <div>{user ? <CurrentUser {...user} /> : <SignInAndUp />}</div>;
};

export default Authentication;
