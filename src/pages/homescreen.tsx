import React, { useState } from "react";
import { database, storage, auth } from "../firebase-config";
import CardComponent from "../Components/Cards/Card";
import CardForm from "../Components/addCardForm/addCard";
import "../styles/homeScreen.css";
import ResponsiveAppBar from "../Components/Navbar/Navbar";

export default function HomeScreen() {
  const [getCards, setCards] = useState<any>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  function handleFormVisibility() {
    setIsFormVisible(true);
  }

  function closeForm() {
    setIsFormVisible(false);
  }

  return (
    <body id="homeScreen">
      <ResponsiveAppBar />
      <div className="CardContainer">
        {/* //fix the key */}
        {Array.from({ length: 20 }, (_, index) => (
          <CardComponent
            title=""
            description=""
            imageUrl=""
            index={index}
            key={index}
          />
        ))}
      </div>

      <CardForm visibility={isFormVisible} onClose={closeForm} />

      <div className="form-popup container" id="popUpForm"></div>

      <button
        id="addEntryButton"
        type="button"
        className="btn"
        onClick={handleFormVisibility}
      >
        <span id="addIcon" className="material-symbols-outlined">
          add
        </span>{" "}
      </button>
    </body>
  );
}
