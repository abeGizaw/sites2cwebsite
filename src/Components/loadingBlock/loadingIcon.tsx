import ReactLoading from "react-loading";
import { Dialog, DialogContentText, DialogTitle } from "@mui/material";

export interface LoadingIconProps {
  visible: boolean;
}
/**
 * Displays a container with a loading icon. Used whenever a fetch to the database is called, and the system needs to wait for the action to be finished
 * @date 6/8/2023 - 10:47:42 PM
 *
 * @export
 * @param {LoadingIconProps} { visible }
 * @returns {*}
 */
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
