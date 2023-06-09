import { ref, get } from "firebase/database";
import { database } from "../../firebase-config";

/**
 * Gets all of the users post's postKeys
 * @date 6/8/2023 - 10:22:19 PM
 *
 * @export
 * @async
 * @param {string} userId
 * @returns {unknown}
 */
export default async function getMyPostKeys(userId: string) {
  return await get(ref(database, `users/${userId}/posts`));
}
