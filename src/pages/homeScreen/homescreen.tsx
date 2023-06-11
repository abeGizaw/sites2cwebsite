import { useState, useEffect, useCallback } from "react";
import { auth } from "../../firebase-config";
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
import LoadingIcon from "../../Components/loadingBlock/loadingIcon";

export default function HomeScreen() {
  const [allPosts, setPosts] = useState<CardProps[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [loadingIconVisible, setLoadingIconVisible] = useState<boolean>(false);
  const [currentUser, setUser] = useState<User | null>(auth.currentUser);
  const [postKeys, setPostKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  /**
   * Adds the addForm form
   * @date 6/8/2023 - 10:45:48 PM
   */
  function handleFormVisibility() {
    setIsFormVisible(true);
  }

  /**
   * Removes the addForm form
   * @date 6/8/2023 - 10:46:03 PM
   */
  function closeForm() {
    setIsFormVisible(false);
  }

  /**
   * Sets all the Postkeys
   * @date 6/8/2023 - 10:19:32 PM
   *
   * @param {string[]} newKeys
   */
  const handlePostKeys = useCallback((newKeys: string[]) => {
    setPostKeys((currentAllKeys) => [...currentAllKeys, ...newKeys]);
  }, []);
  /**
   * Displays the posts on the Screen. Closes the loading Icon once everything has been displayed
   * @date 6/8/2023 - 10:18:33 PM
   *
   * @param {CardProps[]} currentPosts
   */
  const handleDisplayPosts = useCallback(
    (currentPosts: CardProps[]) => {
      if (currentPosts.length === 1) {
        handlePostKeys([currentPosts[0].postKey!]);
      }

      setLoadingIconVisible(false);
      setPosts((currentAllPosts) => {
        return [...currentAllPosts, ...currentPosts];
      });
    },
    [handlePostKeys]
  );

  /**
   * Authenticate the user when they get to this screen and log them in the database
   * @date 6/8/2023 - 10:20:08 PM
   *
   * @returns {*}
   */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
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

  /**
   * Get all the posts from the database. Sets all the inital postKeys of cards On the screen.
   * @date 6/8/2023 - 10:20:08 PM
   *
   * @returns {*}
   */
  useEffect(() => {
    getAllPosts().then((snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        let postKeys: string[] = Object.keys(data) as string[];
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
          postKey: postKeys[index],
        }));
        handleDisplayPosts(cardDataArray);
        handlePostKeys(postKeys);
      }
    });
  }, [handlePostKeys, handleDisplayPosts]);

  return (
    <div className="container-xxl" id="homeScreen">
      <ResponsiveAppBar userId={currentUser ? currentUser.uid : null} />
      <div className="CardContainer">
        {allPosts.map((currentPost, index) => (
          <CardComponent
            postKey={postKeys[index]}
            title={currentPost.title}
            description={currentPost.description}
            imageUrl={currentPost.imageUrl}
            user={currentUser}
            key={index}
          />
        ))}
      </div>

      {currentUser && (
        <CardForm
          visibility={isFormVisible}
          onClose={closeForm}
          addPost={handleDisplayPosts}
          user={currentUser}
          loadingScreen={setLoadingIconVisible}
        />
      )}

      <LoadingIcon visible={loadingIconVisible} />

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
