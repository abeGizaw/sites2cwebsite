import { ref, get, remove } from "firebase/database";
import { database, storage } from "../../firebase-config";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { User } from "firebase/auth";

export default async function getCurrentCard(currentPostKey: string) {
  return await get(ref(database, `posts/${currentPostKey}`));
}

/**
 * Remove a post from the database. Both in the posts path and appropriate user path
 * @date 6/8/2023 - 10:26:54 PM
 *
 * @export
 * @async
 * @param {string} currentPostKey
 * @param {User} currentUser
 * @returns {unknown}
 */
export async function removeCurrentCard(
  currentPostKey: string,
  currentUser: User
) {
  const postRef = storageRef(
    storage,
    `users/${currentUser.uid!}/${currentPostKey}`
  );
  deleteObject(postRef);
  remove(ref(database, `users/${currentUser.uid!}/posts/${currentPostKey}`));
  return await remove(ref(database, `posts/${currentPostKey}`));
}
