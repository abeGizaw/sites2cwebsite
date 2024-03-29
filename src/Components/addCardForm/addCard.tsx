import { useState } from "react";
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
  user: User;
  loadingScreen: (displayLoad: boolean) => void;
}

export default function CardForm({
  visibility,
  onClose,
  addPost,
  user,
  loadingScreen,
}: CardFormProps) {
  const [newFile, setFile] = useState<File | null>(null);
  const [imageSubmitted, setImage] = useState<string | null>(null);
  const [currentTitle, setTitle] = useState<string>("");
  const [currentDesc, setDesc] = useState<string>("");

  /**
   * Handles what happens when a form is closed. Will also display a loading screen while everything gets added to database.
   * @date 6/8/2023 - 10:13:53 PM
   *
   * @async
   * @param {boolean} addedData
   * @returns {*}
   */
  async function handleCloseForm(addedData: boolean) {
    onClose();
    loadingScreen(true);

    if (addedData) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = "";
        return "Leaving now won't save the post you just made. Are you sure you want to leave?";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      try {
        const newPostKey = await writePost(
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
        window.removeEventListener("beforeunload", handleBeforeUnload);
      } catch (error) {
        alert("You are now allowed to change this Post");
      }
    }
    loadingScreen(false);
  }

  /**
   * Clears the form when you enter new data
   * @date 6/8/2023 - 10:40:13 PM
   */
  function clearForm() {
    setTitle("");
    setDesc("");
    setFile(null);
    handleFileChange(null);
  }

  /**
   * Makes sure user tries to upload a valid file type
   * @date 6/8/2023 - 10:16:37 PM
   *
   * @param {File} fileToValidate
   * @returns {boolean}
   */
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

  /**
   * validates that the inputs on the form are good to submit. Must have everything filled and a valid File
   * @date 6/8/2023 - 10:17:52 PM
   *
   * @param {(File | null)} fileInput
   * @returns {boolean}
   */
  function validateForm(fileInput: File | null) {
    if (
      currentTitle.length === 0 ||
      currentDesc.length === 0 ||
      imageSubmitted === null ||
      imageSubmitted!.length === 0 ||
      !fileInput
    ) {
      return false;
    } else if (!validateFile(fileInput)) {
      return false;
    }
    return true;
  }

  /**
   * Handles what happens when a user chooses a file to upload. Converts file to image URL.
   * @date 6/8/2023 - 10:17:01 PM
   *
   * @param {(File | null)} newFile
   */
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
    <Dialog open={visibility} onClose={() => handleCloseForm(false)}>
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
          onClick={() => handleCloseForm(true)}
          disabled={!validateForm(newFile)}
        >
          Add Post
        </Button>
        <Button onClick={() => handleCloseForm(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
