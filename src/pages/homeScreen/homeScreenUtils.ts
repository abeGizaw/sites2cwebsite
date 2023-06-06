import { ref, get, update } from "firebase/database";
import { database, auth } from "../../firebase-config";
import { User } from "firebase/auth";

export default function writeUserData(currentUser: User) {
  update(ref(database, "users/" + currentUser.uid), {
    email: currentUser.email,
  });
}
