import { ref, update } from "firebase/database";
import { database } from "../../firebase-config";
import { User } from "firebase/auth";
import { CardProps } from "../Cards/Card";

export default function editPost({
  title,
  description,
  imageUrl,
  postKey,
}: CardProps) {
  update(ref(database, "posts/" + postKey), {
    cardTitle: title,
    cardDescription: description,
    cardImage: imageUrl,
  });
}
