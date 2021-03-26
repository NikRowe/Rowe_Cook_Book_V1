import React, { useState, useEffect, createContext } from "react";
import { createUserProfileDocument, auth } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const { children } = props;

  useEffect(() => {
    let unsubscribeFromAuth = null;

    /* gets firebase store data and subscribes via onSnapshot() then sets to state for visualization - this will use more api calls as it is calling the API and updating the app anytime this FB collection is being changed. 
    
    You can totally use .get() instead of .onSnapshot() and manually setState() so that the api is only called upon refreshing the page to reduce our API calls. 
    */
    const fetchData = async () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const user = await createUserProfileDocument(userAuth);
        setUser(user);
      });
    };

    fetchData();

    // "clean up" previously done with componentWillUnmount() to prevent memory leak //
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
