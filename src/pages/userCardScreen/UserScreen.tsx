import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../Components/Navbar/Navbar";
import getMyPostKeys from "./userScreenUtils";
import { DataSnapshot } from "firebase/database";
import { CardProps } from "../../Components/Cards/Card";

export default function UserScreen() {
  const navigate = useNavigate();

  const location = useLocation();
  const currentUrl = location.pathname;
  const userId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
  console.log(userId);

  useEffect(() => {
    getMyPostKeys(userId).then((snapshot: DataSnapshot) => {
      // Handle the snapshot data here
      const data = snapshot.val();
      const allPostKeys: string[] = Object.values(data) as string[];
      console.log(allPostKeys);
    });
  }, []);

  return (
    <div className="container-xxl" id="userScreen">
      <ResponsiveAppBar />
    </div>
  );
}
