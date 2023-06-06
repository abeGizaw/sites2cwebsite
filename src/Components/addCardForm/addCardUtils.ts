import { ref, get, update, child, push } from "firebase/database";
import { database, auth } from "../../firebase-config";
import { User } from "firebase/auth";
import { CardProps } from "../Cards/Card";

export default function writePost({
  title,
  description,
  imageUrl,
  index,
}: CardProps) {
  const postKey = push(ref(database, "posts/")).key;
  update(ref(database, "posts/" + postKey), {
    cardTitle: title,
    cardDescription: description,
    cardImage: imageUrl,
    tempIndex: index,
  });
}
