import React, { useState } from "react";
import { auth, firestore } from "../firebase";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  let imageInput = null;

  // const { uid } = auth.currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "displayName" ? setDisplayName(value) : setDisplayName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    const userRef = firestore.doc(`users/${uid}`);

    if (displayName) {
      userRef.update({ displayName });
    }
  };

  return (
    <section className="UserProfile">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          placeholder="Display Name"
        />
        <input type="file" ref={(ref) => (imageInput = ref)} />
        <input className="update" type="submit" />
      </form>
    </section>
  );
};

export default UserProfile;
