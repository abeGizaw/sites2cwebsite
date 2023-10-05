import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./cardScreen.css";
import { CardProps } from "../../Components/Cards/Card";
import CardComponent from "../../Components/Cards/Card";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import { DataSnapshot } from "firebase/database";
import getCurrentCard from "./cardScreenUtils";
import EditCardForm from "../../Components/editCardForm/editCard";
import { removeCurrentCard } from "./cardScreenUtils";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { User } from "firebase/auth";
import LoadingIcon from "../../Components/loadingBlock/loadingIcon";
import RepostCard from "../../Components/repostCardForm/repostCard";

export default function CardScreen() {
  const [currentCard, setCurrentCard] = useState<CardProps>();
  const [isEditFormVisible, setisEditFormVisible] = useState<boolean>(false);
  const [isRepostFormVisible, setisRepostFormVisible] =
    useState<boolean>(false);
  const [currentUser] = useState<User | null>(auth.currentUser);
  const [loadingIconVisible, setLoadingIconVisible] = useState<boolean>(false);

  const location = useLocation();
  const currentUrl = location.pathname;
  const postKey = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
  const navigate = useNavigate();

  /**
   * update the Card on Screen
   * @date 6/8/2023 - 10:24:26 PM
   *
   * @param {CardProps} cardTpUpdate
   */
  function updateCurrentCard(cardToUpdate: CardProps) {
    setCurrentCard(() => cardToUpdate);
  }

  /**
   * Displays the editPost form
   * @date 6/8/2023 - 10:46:43 PM
   */
  function editEntry() {
    setisEditFormVisible(true);
  }

  /**
   * Clsoes the editPost form and opens loading icon until change is finished
   * @date 6/8/2023 - 10:34:11 PM
   */
  function closeForm() {
    setisEditFormVisible(false);
    setLoadingIconVisible(true);
  }

  function repostEntry() {
    setisRepostFormVisible(true);
  }
  /**
   * Delete the card selected and return to the home screen
   * @date 6/8/2023 - 10:25:00 PM
   */
  async function deleteEntry() {
    try {
      await removeCurrentCard(postKey, currentCard?.authorUID).then(
        (snapshot: void) => {
          navigate("/homeScreen");
        }
      );
    } catch (error) {
      alert("You do not have permission to change this post");
    }
  }

  function closeRepostForm() {
    setisRepostFormVisible(false);
    navigate(`/userScreen/${currentUser?.uid}`);
  }
  /**
   * Determins if the user can edit/delete the card on Screen
   * @date 6/11/2023 - 11:13:54 AM
   *
   * @returns {boolean}
   */
  function validUser() {
    return currentUser && currentUser.uid === currentCard!.authorUID;
  }

  /**
   * get the data of the current card from the postKey and set all needed initial data
   * @date 6/8/2023 - 10:25:25 PM
   *
   * @export
   * @returns {*}
   */
  useEffect(() => {
    getCurrentCard(postKey).then((snapshot: DataSnapshot) => {
      const data = snapshot.val();

      const currentCardInfo: CardProps = {
        title: data.cardTitle,
        description: data.cardDescription,
        imageUrl: data.cardImage,
        authorUID: data.cardAuthor,
        ttl: data.ttl,
        file: data.file,
      };
      updateCurrentCard(currentCardInfo);
    });
  }, [postKey]);

  function PostExists(currentCard: CardProps) {
    const http = new XMLHttpRequest();
    http.open("HEAD", currentCard.imageUrl, false);
    http.send();
    if (http.status !== 200) {
      return false;
    }
    return true;
  }

  return (
    <div className="container-xxl" id="singleCardScreen">
      <ResponsiveAppBar userId={currentUser?.uid ? currentUser.uid : null} />
      <div className="currentCardOnScreen container-xxl">
        {currentCard && (
          <>
            <CardComponent
              postKey={postKey}
              title={currentCard.title}
              description={currentCard.description}
              imageUrl={currentCard.imageUrl}
              key={0}
              ttl={currentCard.ttl}
            />

            <EditCardForm
              visibility={isEditFormVisible}
              onClose={closeForm}
              cardOnDisplay={currentCard}
              postKey={postKey}
              updateCard={updateCurrentCard}
              iconDisplay={setLoadingIconVisible}
            />
            <RepostCard
              visibility={isRepostFormVisible}
              onClose={closeRepostForm}
              postUser={currentUser!}
              postFile={currentCard.file!}
              postKey={postKey}
            />
            <LoadingIcon visible={loadingIconVisible} />
            {validUser() && (
              <div className="buttonContainer">
                <button
                  type="button"
                  className="btn btn-lg btn-primary"
                  onClick={editEntry}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-danger"
                  onClick={deleteEntry}
                >
                  Delete
                </button>
                {!PostExists(currentCard) && (
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    onClick={repostEntry}
                  >
                    Repost
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
