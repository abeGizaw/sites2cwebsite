import { ref, update } from "firebase/database";
import { database, storage } from "../../firebase-config";
import {
  deleteObject,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { CardProps } from "../Cards/Card";

/**
 * When a post gets edited, change it in all appropriate places in the database
 * @date 6/8/2023 - 10:28:12 PM
 *
 * @export
 * @async
 * @param {CardProps} { title, description, postKey }
 * @param {string} authorUID
 * @param {File} newFile
 * @returns {*}
 */
export default async function editPost(
  { title, description, postKey }: CardProps,
  newFile: File,
  authorUID: string | undefined
) {
  await update(ref(database, `users/${authorUID}/posts/${postKey}/`), {
    cardTitle: title,
    cardDescription: description,
  });
  await update(ref(database, "posts/" + postKey), {
    cardTitle: title,
    cardDescription: description,
  });
  if (newFile) {
    const postRef = storageRef(storage, `users/${authorUID}/${postKey}`);
    await deleteObject(postRef);
    await uploadBytes(postRef, newFile);
    const url = await getDownloadURL(postRef);
    await update(ref(database, `users/${authorUID}/posts/${postKey}/`), {
      cardImage: url,
    });
    await update(ref(database, "posts/" + postKey), {
      cardImage: url,
    });
  }
}
