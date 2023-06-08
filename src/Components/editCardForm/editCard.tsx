import React, { useState, useEffect } from "react";
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

export interface editCardProps {
  visibility: boolean;
  onClose: () => void;
  cardOnDisplay: CardProps;
  postKey: string;
  updateCard: (newCardInfo: CardProps) => void;
}

export default function EditCardForm({
  visibility,
  onClose,
  cardOnDisplay,
  postKey,
  updateCard,
}: editCardProps) {
  const [currentCardOnScreen, setCurrentCardOnScreen] = useState<CardProps>();
  const [newFile, setFile] = useState<File | null>(null);
  const [imageSubmitted, setImage] = useState<string>(cardOnDisplay.imageUrl);
  const [currentTitle, setTitle] = useState<string>(cardOnDisplay.title);
  const [currentDesc, setDesc] = useState<string>(cardOnDisplay.description);
  function handleClose(editedData: boolean) {
    if (editedData) {
      const newCardInfo: CardProps = {
        title: currentTitle,
        description: currentDesc,
        imageUrl: imageSubmitted,
        postKey: postKey,
      };
      editPost(newCardInfo);
      updateCardOnScreen(newCardInfo);
    }
    onClose();
  }

  function updateCardOnScreen(newCardOnScreen: CardProps) {
    setCurrentCardOnScreen(newCardOnScreen);
    updateCard(newCardOnScreen);
  }

  function validateFile(fileToValidate: File | null) {
    if (fileToValidate) {
      const fileExtension = fileToValidate.name.split(".").pop()?.toLowerCase();
      if (
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg"
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

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
    } else if (!validateFile(fileToValidate)) {
      return false;
    }
    return true;
  }

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

  function initializeCardOnScreen() {
    const currentCardInfo: CardProps = {
      title: cardOnDisplay.title,
      description: cardOnDisplay.description,
      imageUrl: cardOnDisplay.imageUrl,
      postKey: cardOnDisplay.postKey,
    };
    setCurrentCardOnScreen(() => {
      return currentCardInfo;
    });
  }

  useEffect(() => {
    initializeCardOnScreen();
  }, []);

  return (
    <Dialog open={visibility} onClose={handleClose}>
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
