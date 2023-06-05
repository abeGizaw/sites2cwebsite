import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { provider } from "../firebase-config";
import { NavigateFunction } from "react-router-dom";

export default function userLogin(navigate: NavigateFunction) {
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      let token: string = "";
      if (credential) {
        token = credential.accessToken!;
      }
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      //redirect
      navigate("/homeScreen");
      // <Link > </Link>;
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
}

export function userSignout(navigate: NavigateFunction) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      // An error happened.
    });
}
