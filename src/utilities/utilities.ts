import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { provider } from "../firebase-config";
import { NavigateFunction } from "react-router-dom";
import { auth } from "../firebase-config";

/**
 * Attempts to log the user in. On Sucess it sends the user to the home Screen.
 * @date 6/8/2023 - 10:42:38 PM
 *
 * @export
 * @param {NavigateFunction} navigate
 */
export default function userLogin(navigate: NavigateFunction) {
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

/**
 * Signs the user out and sends them back to the login screen
 * @date 6/8/2023 - 10:43:33 PM
 *
 * @export
 * @param {NavigateFunction} navigate
 */
export function userSignout(navigate: NavigateFunction) {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      // An error happened.
    });
}
