import { ref, get, update } from "firebase/database";
import { database } from "../../firebase-config";
import { User } from "firebase/auth";

export default async function getMyPostKeys(userId: string) {
  return await get(ref(database, `users/${userId}/posts`));
}
