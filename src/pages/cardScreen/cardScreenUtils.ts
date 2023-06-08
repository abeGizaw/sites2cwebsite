import { ref, get, remove } from "firebase/database";
import { database, auth } from "../../firebase-config";
import { User } from "firebase/auth";

export default async function getCurrentCard(currentPostKey: string) {
  return await get(ref(database, `posts/${currentPostKey}`));
}
export async function removeCurrentCard(currentPostKey: string) {
  return await remove(ref(database, `posts/${currentPostKey}`));
}
