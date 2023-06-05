import React, { useState } from "react";
import { database, storage, auth } from "../firebase-config";

import { CardActionArea, Container } from "@mui/material";
import CardComponent from "../Components/Card";
import CardForm from "../Components/addCard";
import "../styles/homeScreen.css";

export default function HomeScreen() {
  const [getCards, setCards] = useState<any>();
  const [isFormVisible, setIsFormVisible] = useState<string>("none");

  function handleFormVisibility() {
    setIsFormVisible("block");
  }

  return (
    <body id="homeScreen">
      <div className="CardContainer">
        {Array.from({ length: 20 }, (_, index) => (
          <CardComponent title="" description="" imageUrl="" index={index} />
        ))}
      </div>

      <CardForm visibility={isFormVisible} />

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
