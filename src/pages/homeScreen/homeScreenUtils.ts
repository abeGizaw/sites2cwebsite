import { ref, get, update } from "firebase/database";
import { database } from "../../firebase-config";
import { User } from "firebase/auth";

export default function writeUserData(currentUser: User) {
  update(ref(database, "users/" + currentUser.uid), {
    email: currentUser.email,
  });
}

export async function getAllPosts() {
  return await get(ref(database, "posts/"));
}
