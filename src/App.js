import React, { useEffect } from "react";
import { firestore } from "./firebase";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection("recipes").get();

      snapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();

        console.log("id, data :", { id, data });
      });
    };

    fetchData();
  });

  return (
    <div className="App">
      <h1>Rowe Cook Book</h1>
    </div>
  );
}

export default App;
