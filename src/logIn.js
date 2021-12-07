import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { useState } from "react";
import firebaseApp from "./firebase-config";
import app from "./App";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import avatar from "./images/LogInAvatar.jpg";

const addNewBalance = async (user) => {
  //  e.preventDefault();
  console.log("setting balance for user");
  console.log(user);
  await addDoc(collection(db, "Stockies"), {
    balance: 1000,
    userID: user.email
  });
};

const signUp = (auth, email, password, setTheAuthUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      console.log("HELLO");
      console.log(user);
      console.log("ID?????");
      console.log(user.uid);
      setTheAuthUser(user);
      addNewBalance(user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};

const signIn = (auth, email, password, setTheAuthUser) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("HERE SIGNED IN USER");
      console.log(user);
      console.log(user);
      setTheAuthUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not valid");
      console.log(errorMessage);
      alert(errorMessage);
    });
};

export default function ({ setTheAuthUser, setBalance, balance }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebaseApp);

  return (
    <div>
      {console.log}
      <h1>--Logo--</h1>
      <h1>
        stocks<text style={{ color: "forestgreen" }}>U</text>p
      </h1>
      <img
        className="background"
        src={avatar}
        alt="Login Avatar"
        width="100%"
        height="500px"
      />
      <h1>Log In</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn(auth, email, password, setTheAuthUser);
        }}
      >
        <label className="Login">
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </label>

        <button className="submit" type="submit">
          SUBMIT
        </button>
      </form>
      <h1>Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp(auth, email, password, setTheAuthUser);
        }}
      >
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </label>
        <button className="submit" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
