import { ref, get, update } from "firebase/database";
import { database } from "../../firebase-config";
import { User } from "firebase/auth";

/**
 * Register the user in the database
 * @date 6/8/2023 - 10:27:51 PM
 *
 * @export
 * @param {User} currentUser
 */
export default function writeUserData(currentUser: User) {
  update(ref(database, "users/" + currentUser.uid), {
    email: currentUser.email,
  });
}

/**
 * Get all Posts
 * @date 6/8/2023 - 10:28:01 PM
 *
 * @export
 * @async
 * @returns {unknown}
 */
export async function getAllPosts() {
  return await get(ref(database, "posts/"));
}
