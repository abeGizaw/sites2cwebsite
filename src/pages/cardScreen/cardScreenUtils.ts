import { ref, get, remove } from "firebase/database";
import { database, storage } from "../../firebase-config";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { User } from "firebase/auth";

export default async function getCurrentCard(currentPostKey: string) {
  return await get(ref(database, `posts/${currentPostKey}`));
}
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
