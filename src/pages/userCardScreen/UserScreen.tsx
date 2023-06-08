import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import getMyPostKeys from "./userScreenUtils";
import { DataSnapshot } from "firebase/database";
import CardComponent, { CardProps } from "../../Components/Cards/Card";

export default function UserScreen() {
  const [currentUserCards, setCurrentUserCards] = useState<CardProps[]>([]);
  const [currentUserPostkeys, setCurrentUserPostkeys] = useState<string[]>([]);

  const location = useLocation();
  const currentUrl = location.pathname;
  const userId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
  console.log(userId);

  useEffect(() => {
    getMyPostKeys(userId).then((snapshot: DataSnapshot) => {
      // Handle the snapshot data here
      const data = snapshot.val();
      let postKeys: string[] = Object.keys(data) as string[];

      setCurrentUserPostkeys(postKeys);

      const cardDataArray: CardProps[] = (
        Object.values(data) as Array<{
          cardTitle: string;
          cardDescription: string;
          cardImage: string;
        }>
      ).map((currentEntry, index) => ({
        title: currentEntry.cardTitle,
        description: currentEntry.cardDescription,
        imageUrl: currentEntry.cardImage,
      }));
      setCurrentUserCards(cardDataArray);
    });
  }, []);

  return (
    <div className="container-xxl" id="userScreen">
      <ResponsiveAppBar userId={userId} />
      <div className="CardContainer">
        {/* //fix the key */}
        {currentUserCards.map((currentPost, index) => (
          <CardComponent
            title={currentPost.title} // Provide appropriate values for title, description, and imageUrl
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
