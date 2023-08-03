import { ref, update, push } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "../../firebase-config";
import { User } from "firebase/auth";
import { CardProps } from "../Cards/Card";
import { FOREVER_TTL_URL } from "../../constants";
import { generateSignedURL } from "firebase/storage";
/**
 * writes posts to the database. uplaods the image from storage, then writes the post to the posts path and appropriate user path
 * @date 6/8/2023 - 10:11:36 PM
 *
 * @export
 * @async
 * @param {CardProps} { title, description }
 * @param {User} currentUser
 * @param {File} file
 * @returns {string} new postKey to be added
 */
export default async function writePost(
  { title, description, ttl }: CardProps,
  currentUser: User,
  file: File
) {
  let url: string;
  const postKey = push(ref(database, "posts/")).key;
  const postRef = storageRef(storage, `users/${currentUser.uid!}/${postKey}`);
  await uploadBytes(postRef, file);
  if (ttl === FOREVER_TTL_URL) {
    url = await getDownloadURL(postRef);
  } else {
    url = await generateSignedURL(postRef, { ttlSeconds: ttl });
  }
  await update(ref(database, "posts/" + postKey), {
    cardAuthor: currentUser.uid,
    cardTitle: title,
    cardDescription: description,
    cardImage: url,
    ttl: ttl,
  });
  await update(ref(database, `users/${currentUser.uid}/posts/${postKey}/`), {
    cardTitle: title,
    cardDescription: description,
    cardImage: url,
    ttl: ttl,
  });

  return postKey;
}
