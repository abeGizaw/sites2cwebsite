import ReactLoading from "react-loading";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "firebase/auth";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export interface LoadingIconProps {
  visible: boolean;
}
export default function LoadingIcon({ visible }: LoadingIconProps) {
  return (
    <Dialog open={visible}>
      <DialogTitle>Loading...</DialogTitle>
      <DialogContentText
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />{" "}
      </DialogContentText>
    </Dialog>
  );
}
