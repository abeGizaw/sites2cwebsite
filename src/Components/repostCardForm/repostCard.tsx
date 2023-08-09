import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { FOREVER_TTL_URL } from "../../constants";
import { useState } from "react";
import reWritePost from "./repostCardUtils";
import { User } from "firebase/auth";

export interface repostCardProps {
  visibility: boolean;
  onClose: () => void;
  postUser: User;
  postFile: File;
  postKey: string;
}

export default function RepostCard({
  visibility,
  onClose,
  postUser,
  postFile,
  postKey,
}: repostCardProps) {
  const [ttl, setTTL] = useState<number>(FOREVER_TTL_URL);

  async function handleClose(repostData: boolean) {
    if (repostData) {
      await reWritePost(ttl, postUser, postFile, postKey);
    }
    onClose();
  }

  return (
    <Dialog open={visibility} onClose={() => handleClose(false)}>
      <DialogTitle>Add Post</DialogTitle>
      <DialogContent>
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <DialogContentText>
            How long do you want the post to stay up for?
          </DialogContentText>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={ttl}
            onChange={(e) => setTTL(e.target.value as number)}
          >
            <MenuItem value={FOREVER_TTL_URL}>forever</MenuItem>
            <MenuItem value={5}>5 Seconds</MenuItem>
            <MenuItem value={10}>10 Seconds</MenuItem>
            <MenuItem value={20}>20 Seconds</MenuItem>
            <MenuItem value={30}>30 Seconds</MenuItem>
          </Select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)}>Repost</Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
