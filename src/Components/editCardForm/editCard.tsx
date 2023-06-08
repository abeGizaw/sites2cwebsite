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
import { update } from "firebase/database";

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
  const [initialData, setNewData] = useState<CardProps>();
  const [newFile, setValue] = useState<File | null>(null);
  const [imageSubmitted, setImage] = useState<string>(cardOnDisplay.imageUrl);
  const [currentTitle, setTitle] = useState<string>(cardOnDisplay.title);
  const [currentDesc, setDesc] = useState<string>(cardOnDisplay.description);
  function handleClose(editedData: boolean) {
    if (editedData) {
      editPost({
        title: currentTitle,
        description: currentDesc,
        imageUrl: imageSubmitted!,
        postKey: postKey,
      });
      updateCardOnScreen();
    }
    onClose();
  }

  function updateCardOnScreen() {
    const newCardInfo: CardProps = {
      title: currentTitle,
      description: currentDesc,
      imageUrl: imageSubmitted,
      postKey: cardOnDisplay.postKey,
    };
    setNewData(newCardInfo);
    updateCard(newCardInfo);
  }

  function validateForm(): boolean | undefined {
    // console.log(initialData?.title);
    // console.log(initialData?.description);
    // console.log("");
    // console.log(currentTitle);
    // console.log(currentDesc);

    if (
      currentTitle.length === 0 ||
      currentDesc.length === 0 ||
      imageSubmitted == null ||
      imageSubmitted!.length === 0
    ) {
      return true;
    } else if (
      currentTitle === initialData?.title &&
      currentDesc === initialData?.description &&
      imageSubmitted === initialData?.imageUrl
    ) {
      return true;
    }
    console.log("saw diff");
    return false;
  }

  function handleChange(newValue: File | null) {
    setValue(newValue);
    if (newValue) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(newValue);
    }
  }

  function initializeCardOnScreen() {
    const currentCardInfo: CardProps = {
      title: cardOnDisplay.title,
      description: cardOnDisplay.description,
      imageUrl: cardOnDisplay.imageUrl,
      postKey: cardOnDisplay.postKey,
    };
    setNewData(() => {
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
        <MuiFileInput value={newFile} onChange={handleChange} required />
        {imageSubmitted && <Image src={imageSubmitted} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)} disabled={validateForm()}>
          Submit Change
        </Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
