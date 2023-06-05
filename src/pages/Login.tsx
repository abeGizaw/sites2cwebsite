import React from "react";
import "../styles/Login.css";
import g_logo from "../assets/g_logo.png";
import { database, storage, auth, provider } from "../firebase-config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // let token: string = "";
      // if (credential) {
      //   token = credential.accessToken!;
      // }
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  return (
    <>
      <div className="Login">
        <div className="h-flex">
          <img src={g_logo} className="Logo" alt="logo" />
          <div className="v-flex">
            <div className="Title">Sites2C</div>
            <hr className="Break" />
            <div className="SubTitle">Googler Trip Recommendations</div>
          </div>
        </div>
      </div>
    </>
  );
}
