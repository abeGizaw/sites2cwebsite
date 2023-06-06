import React, { useState, useEffect } from "react";
import { database, storage, auth } from "../../firebase-config";
import CardComponent from "../../Components/Cards/Card";
import CardForm from "../../Components/addCardForm/addCard";
import "../../styles/homeScreen.css";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import writeUserData from "./homeScreenUtils";

export default function HomeScreen() {
  const [getCards, setCards] = useState<any>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [currentUser, setUser] = useState<User | null>(auth.currentUser);

  const navigate = useNavigate();

  function handleFormVisibility() {
    setIsFormVisible(true);
  }

  function closeForm() {
    setIsFormVisible(false);
  }

  useEffect(() => {
    // const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        writeUserData(user);

        // console.log(uid);
        // ...
      } else {
        // User is signed out
        navigate("/");
      }
    });
    return () => {
      unsub();
    };
  }, [navigate]);

  // console.log(currentUser!.uid);

  return (
    <div className="container-xxl" id="homeScreen">
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
    </div>
  );
}
