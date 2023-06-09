import { ref, get, remove } from "firebase/database";
import { auth, database, storage } from "../../firebase-config";
import { deleteObject, ref as storageRef } from "firebase/storage";

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
  authorUID: string | undefined
) {
  console.log(authorUID);
  const postRef = storageRef(storage, `users/${authorUID}/${currentPostKey}`);
  // TODO wrap below in try-catch
  await deleteObject(postRef);
  await remove(ref(database, `users/${authorUID}/posts/${currentPostKey}`));
  await remove(ref(database, `posts/${currentPostKey}`));
}
