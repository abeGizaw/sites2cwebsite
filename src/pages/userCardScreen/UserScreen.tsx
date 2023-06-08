import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserScreen() {
  const navigate = useNavigate();

  return (
    <>
      <div className="UserPage">User</div>
    </>
  );
}
