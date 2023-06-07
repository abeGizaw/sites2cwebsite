import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/Login.css";
import { CardProps } from "../../Components/Cards/Card";
import CardComponent from "../../Components/Cards/Card";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import { DataSnapshot, update } from "firebase/database";
import getCurrentCard from "./cardScreenUtils";

export default function CardScreen() {
  const [currentCard, setCurrentCard] = useState<CardProps>();

  const location = useLocation();
  const currentUrl = location.pathname;
  const postKey = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

  console.log(postKey);

  function updateCurrentCard(cardTpUpdate: CardProps) {
    setCurrentCard(() => cardTpUpdate);
  }

  useEffect(() => {
    getCurrentCard(postKey).then((snapshot: DataSnapshot) => {
      const data = snapshot.val();
      console.log(data);
      console.log(data.title);

      const currentCardInfo: CardProps = {
        title: data.cardTitle,
        description: data.cardDescription,
        imageUrl: data.cardImage,
      };

      updateCurrentCard(currentCardInfo);
    });
  }, [postKey]);

  return (
    <div className="container-xxl" id="singleCardScreen">
      <ResponsiveAppBar />
      {currentCard && (
        <CardComponent
          postKey={postKey}
          title={currentCard.title} // Provide appropriate values for title, description, and imageUrl
          description={currentCard.description}
          imageUrl={currentCard.imageUrl}
          key={0}
        />
      )}
    </div>
  );
}
