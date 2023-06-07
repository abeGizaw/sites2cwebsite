import { ref, get, update } from "firebase/database";
import { database, auth } from "../../firebase-config";
import { User } from "firebase/auth";

export default async function getCurrentCard(currentPostKey: string) {
  return await get(ref(database, `posts/${currentPostKey}`));
}
