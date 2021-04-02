import React, { useState } from "react";
import { auth, firestore, storage } from "../firebase";

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
    const file = imageInput && imageInput.files[0];

    if (displayName) {
      userRef.update({ displayName });
    }

    if (file) {
      storage
        .ref()
        .child("user-profiles")
        .child(uid)
        .child(file.name)
        .put(file)
        .then((res) => res.ref.getDownloadURL())
        .then((photoURL) => userRef.update({ photoURL }));
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
