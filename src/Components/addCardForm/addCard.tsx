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

interface CardFormProps {
  visibility: boolean;
  onClose: () => void;
}

export default function CardForm({ visibility, onClose }: CardFormProps) {
  const [newFile, setValue] = useState<File | null>(null);
  const [imageSubmitted, setImage] = useState<string | null>(null);
  const [currentTitle, setTitle] = useState<string>("");
  const [currentDesc, setDesc] = useState<string>("");

  function handleClose(addedData: boolean) {
    onClose();
    if (addedData) {
      writePost({
        title: currentTitle,
        description: currentDesc,
        imageUrl: imageSubmitted!,
        index: 2,
      });
    }
  }

  function handleChange(newValue: File | null) {
    setValue(newValue);
    if (newValue) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(newValue!);
    }
  }

  return (
    <Dialog open={visibility} onClose={handleClose}>
      <DialogTitle>Add Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a post, please give it a title, description, and an image
          (optional)
        </DialogContentText>
        <TextField
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
        <MuiFileInput value={newFile} onChange={handleChange} />
        {imageSubmitted && <Image src={imageSubmitted!} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)}>Add Post</Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
