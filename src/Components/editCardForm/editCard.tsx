import { useState, useEffect, useCallback } from "react";
import "../../styles/homeScreen.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiFileInput } from "mui-file-input";
import Image from "mui-image";
import { CardProps } from "../Cards/Card";
import editPost from "./editCardUtils";
import { FOREVER_TTL_URL } from "../../constants";

export interface editCardProps {
  visibility: boolean;
  onClose: () => void;
  cardOnDisplay: CardProps;
  postKey: string;
  updateCard: (newCardInfo: CardProps) => void;
  iconDisplay: (toDisplay: boolean) => void;
}

export default function EditCardForm({
  visibility,
  onClose,
  cardOnDisplay,
  postKey,
  updateCard,
  iconDisplay,
}: editCardProps) {
  const [currentCardOnScreen, setCurrentCardOnScreen] = useState<CardProps>();
  const [newFile, setFile] = useState<File | null>(null);
  const [imageSubmitted, setImage] = useState<string>(cardOnDisplay.imageUrl);
  const [currentTitle, setTitle] = useState<string>(cardOnDisplay.title);
  const [currentDesc, setDesc] = useState<string>(cardOnDisplay.description);

  /**
   * handles what happens when you close the edit form post. talks to the database and the screen to edit the post. Also Deals with the loading screen
   * @date 6/8/2023 - 10:33:00 PM
   *
   * @param {boolean} editedData
   */
  async function handleClose(editedData: boolean) {
    onClose();
    iconDisplay(true);
    if (editedData) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue =
          "Leaving now won't save the post you just made. Are you sure you want to leave?";

        return "Leaving now won't save the post you just made. Are you sure you want to leave?";
      };

      const newCardInfo: CardProps = {
        title: currentTitle,
        description: currentDesc,
        imageUrl: imageSubmitted,
        postKey: postKey,
        authorUID: currentCardOnScreen?.authorUID,
        ttl: currentCardOnScreen?.ttl ?? FOREVER_TTL_URL,
      };
      try {
        await editPost(newCardInfo, newFile!, currentCardOnScreen!.authorUID);
        updateCardOnScreen(newCardInfo);
      } catch (error) {
        alert("You do not have permissions to change this post");
      }

      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
    iconDisplay(false);
  }

  /**
   * Update the data of the card on the screen and tells the CardScreen page about the change
   * @date 6/8/2023 - 10:35:23 PM
   *
   * @param {CardProps} newCardOnScreen
   */
  function updateCardOnScreen(newCardOnScreen: CardProps) {
    setCurrentCardOnScreen(newCardOnScreen);
    updateCard(newCardOnScreen);
  }

  /**
   * Validates the file is a valid file type
   * @date 6/8/2023 - 10:36:01 PM
   *
   * @param {(File | null)} fileToValidate
   * @returns {boolean}
   */
  function validateFile(fileToValidate: File | null) {
    if (fileToValidate) {
      const fileExtension = fileToValidate.name.split(".").pop()?.toLowerCase();
      if (
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "webp"
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  /**
   * Validates that you have proper inputs. Nothing can be empty and there must be a present change
   * @date 6/8/2023 - 10:36:13 PM
   *
   * @param {(File | null)} fileToValidate
   * @returns {boolean}
   */
  function validateForm(fileToValidate: File | null) {
    if (
      currentTitle.length === 0 ||
      currentDesc.length === 0 ||
      imageSubmitted == null ||
      imageSubmitted!.length === 0 ||
      !File
    ) {
      return false;
    } else if (
      currentTitle === currentCardOnScreen?.title &&
      currentDesc === currentCardOnScreen?.description &&
      imageSubmitted === currentCardOnScreen?.imageUrl
    ) {
      return false;
    } else if (fileToValidate) {
      if (!validateFile(fileToValidate)) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  /**
   * When a file is changed, set the file and convert it to a url to have reference too
   * @date 6/8/2023 - 10:36:39 PM
   *
   * @param {(File | null)} newValue
   */
  function handleFileChange(newValue: File | null) {
    if (newValue) {
      setFile(newValue);
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(newValue);
    } else {
      setFile(null);
      setImage(currentCardOnScreen!.imageUrl);
    }
  }

  /**
   * Initialize the data of the card on the screen. This is for later compariosn to make sure you are making chnages on the post
   * @date 6/8/2023 - 10:37:03 PM
   */
  const initializeCardOnScreen = useCallback(() => {
    const currentCardInfo: CardProps = {
      title: cardOnDisplay.title,
      description: cardOnDisplay.description,
      imageUrl: cardOnDisplay.imageUrl,
      postKey: cardOnDisplay.postKey,
      authorUID: cardOnDisplay.authorUID,
      ttl: cardOnDisplay.ttl,
    };
    setCurrentCardOnScreen(() => {
      return currentCardInfo;
    });
  }, [
    cardOnDisplay.authorUID,
    cardOnDisplay.description,
    cardOnDisplay.imageUrl,
    cardOnDisplay.postKey,
    cardOnDisplay.title,
    cardOnDisplay.ttl,
  ]);

  useEffect(() => {
    initializeCardOnScreen();
  }, [initializeCardOnScreen]);

  return (
    <Dialog open={visibility} onClose={() => handleClose(false)}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit Your Post</DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="email"
          fullWidth
          variant="standard"
          value={currentTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          type="email"
          fullWidth
          variant="standard"
          value={currentDesc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <MuiFileInput value={newFile} onChange={handleFileChange} required />
        {imageSubmitted && <Image src={imageSubmitted} />}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(true)}
          disabled={!validateForm(newFile)}
        >
          Submit Change
        </Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
