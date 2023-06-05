import { Container } from "@mui/material";
import React from "react";
import "../../styles/homeScreen.css";

export default function CardForm({ visibility }: { visibility: string }) {
  function handleDisplay() {
    visibility = "none";
  }

  return (
    <Container
      maxWidth="sm"
      className="addCardContainer"
      style={{ display: visibility }}
    >
      {" "}
      <form className="form-container">
        <input type="text" id="title" placeholder="Title"></input>
        <input type="author" id="author" placeholder="Author"></input>
        <input type="pages" id="pages" placeholder="Pages"></input>
        <button type="submit" onClick={handleDisplay}>
          Submit
        </button>
      </form>
    </Container>
  );
}
