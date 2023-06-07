import { ref, get, update } from "firebase/database";
import { database, auth } from "../../firebase-config";
import { User } from "firebase/auth";

export default function getCurrentCard(currentPostKey: string) {
  console.log(currentPostKey);
  return 3;
}
