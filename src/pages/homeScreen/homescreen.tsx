import React, { useState, useEffect } from "react";
import { database, storage, auth } from "../../firebase-config";
import CardComponent from "../../Components/Cards/Card";
import CardForm from "../../Components/addCardForm/addCard";
import "../../styles/homeScreen.css";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import writeUserData from "./homeScreenUtils";
import { getAllPosts } from "./homeScreenUtils";
import { CardProps } from "../../Components/Cards/Card";
import { DataSnapshot } from "firebase/database";

export default function HomeScreen() {
  const [allPosts, setPosts] = useState<CardProps[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [currentUser, setUser] = useState<User | null>(auth.currentUser);

  const navigate = useNavigate();

  function handleFormVisibility() {
    setIsFormVisible(true);
  }

  function closeForm() {
    setIsFormVisible(false);
  }

  function handlePosts(currentPosts: CardProps[]) {
    // console.trace("hanlde called");
    setPosts((currentAllPosts) => {
      return [...currentAllPosts, ...currentPosts];
    });
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        writeUserData(user);
      } else {
        // User is signed out
        navigate("/");
      }
    });
    return () => {
      unsub();
    };
  }, [navigate]);

  useEffect(() => {
    getAllPosts().then((snapshot: DataSnapshot) => {
      // Handle the snapshot data here
      const data = snapshot.val();
      if (data) {
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

        handlePosts(cardDataArray);
      }
      // ...
    });
  }, []);

  return (
    <div className="container-xxl" id="homeScreen">
      <ResponsiveAppBar />
      <div className="CardContainer">
        {/* //fix the key */}
        {allPosts.map((currentPost, index) => (
          <CardComponent
            title={currentPost.title} // Provide appropriate values for title, description, and imageUrl
            description={currentPost.description}
            imageUrl={currentPost.imageUrl}
            key={index}
          />
        ))}
      </div>

      <CardForm
        visibility={isFormVisible}
        onClose={closeForm}
        addPost={handlePosts}
      />

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
