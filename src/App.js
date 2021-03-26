import React, { useEffect, useState } from "react";
import { auth, createUserProfileDocument } from "./firebase";
import "./App.css";

import Recipes from "./components/Recipes";
import Authentication from "./components/Authentication";

const App = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
      <Authentication user={user} />
      <Recipes />
    </div>
  );
};

export default App;
