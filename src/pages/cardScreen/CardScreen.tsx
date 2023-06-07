import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/Login.css";
import { CardProps } from "../../Components/Cards/Card";
import CardComponent from "../../Components/Cards/Card";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import { DataSnapshot } from "firebase/database";
import getCurrentCard from "./cardScreenUtils";

export default function CardScreen() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const postKey = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

  console.log(postKey);

  useEffect(() => {
    getCurrentCard(postKey);
  });
  return (
    <div className="container-xxl" id="singleCardScreen">
      <ResponsiveAppBar />
    </div>
  );
}
