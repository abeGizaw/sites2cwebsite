import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import getMyPostKeys from "./userScreenUtils";
import { DataSnapshot } from "firebase/database";
import CardComponent, { CardProps } from "../../Components/Cards/Card";

export default function UserScreen() {
  const [currentUserCards, setCurrentUserCards] = useState<CardProps[]>([]);
  const [currentUserPostkeys, setCurrentUserPostkeys] = useState<string[]>([]);

  /**
   * Get the url and find the userID from that URL
   * @date 6/8/2023 - 10:44:57 PM
   *
   * @type {*}
   */
  const location = useLocation();
  const currentUrl = location.pathname;
  const userId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

  /**
   * Gets all of the current user's post from the database and sets them locally to display
   * @date 6/8/2023 - 10:22:47 PM
   *
   * @export
   * @returns {*}
   */
  useEffect(() => {
    getMyPostKeys(userId).then((snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        let postKeys: string[] = Object.keys(data) as string[];
        setCurrentUserPostkeys(postKeys);

        const cardDataArray: CardProps[] = (
          Object.values(data) as Array<{
            cardTitle: string;
            cardDescription: string;
            cardImage: string;
          }>
        ).map((currentEntry) => ({
          title: currentEntry.cardTitle,
          description: currentEntry.cardDescription,
          imageUrl: currentEntry.cardImage,
        }));
        setCurrentUserCards(cardDataArray);
      }
    });
  }, [userId]);

  return (
    <div className="container-xxl" id="userScreen">
      <ResponsiveAppBar userId={userId} />
      <div className="CardContainer">
        {currentUserCards.map((currentPost, index) => (
          <CardComponent
            title={currentPost.title}
            description={currentPost.description}
            imageUrl={currentPost.imageUrl}
            postKey={currentUserPostkeys[index]}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
