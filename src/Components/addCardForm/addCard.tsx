import React, { useState } from "react";
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
import writePost from "./addCardUtils";
import { CardProps } from "../Cards/Card";
import { User } from "firebase/auth";

interface CardFormProps {
  visibility: boolean;
  onClose: () => void;
  addPost: (newPost: CardProps[]) => void;
  user?: User | null;
}

export default function CardForm({
  visibility,
  onClose,
  addPost,
  user,
}: CardFormProps) {
  const [newFile, setFile] = useState<File | null>(null);
  const [imageSubmitted, setImage] = useState<string | null>(null);
  const [currentTitle, setTitle] = useState<string>("");
  const [currentDesc, setDesc] = useState<string>("");
  function handleClose(addedData: boolean) {
    if (addedData) {
      const newPostKey = writePost(
        {
          title: currentTitle,
          description: currentDesc,
          imageUrl: imageSubmitted!,
        },
        user!,
        newFile!
      );

      addPost([
        {
          title: currentTitle,
          description: currentDesc,
          imageUrl: imageSubmitted!,
          postKey: newPostKey!,
        },
      ]);
      clearForm();
    }
    onClose();
  }

  function clearForm() {
    setTitle("");
    setDesc("");
    setFile(null);
    handleFileChange(null);
  }

  function validateFile(fileToValidate: File) {
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

  function validateForm(fileInput: File | null) {
    if (
      currentTitle.length === 0 ||
      currentDesc.length === 0 ||
      imageSubmitted == null ||
      imageSubmitted!.length === 0 ||
      !fileInput
    ) {
      return false;
    } else if (!validateFile(fileInput)) {
      return false;
    }
    return true;
  }

  function handleFileChange(newFile: File | null) {
    if (newFile) {
      if (validateFile(newFile)) {
        setFile(newFile);

        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result as string;
          setImage(dataURL);
        };
        reader.readAsDataURL(newFile!);
      }
    } else {
      setImage(null);
    }
  }

  return (
    <Dialog open={visibility} onClose={handleClose}>
      <DialogTitle>Add Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a post, please give it a title, description, and an image(png,
          jpg, jpeg)
        </DialogContentText>
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
        {imageSubmitted && <Image src={imageSubmitted!} />}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(true)}
          disabled={!validateForm(newFile)}
        >
          Add Post
        </Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
