import { ref, get, update, child, push } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, auth, storage } from "../../firebase-config";
import { User } from "firebase/auth";
import { CardProps } from "../Cards/Card";

export default function writePost(
  { title, description }: CardProps,
  currentUser: User,
  file: File
) {
  const postKey = push(ref(database, "posts/")).key;
  const postRef = storageRef(storage, postKey!);
  uploadBytes(postRef, file).then(() => {
    getDownloadURL(postRef).then((url) => {
      update(ref(database, "posts/" + postKey), {
        cardTitle: title,
        cardDescription: description,
        cardImage: url,
      });
      update(ref(database, `users/${currentUser.uid}/posts/${postKey}/`), {
        cardTitle: title,
        cardDescription: description,
        cardImage: url,
      });
    });
  });
  return postKey;
}
