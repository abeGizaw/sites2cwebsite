import React from "react";
import "../styles/Login.css";
import g_logo from "../assets/g_logo.png";
import { database, storage, auth } from "../firebase-config";

function Login() {
  return (
    <>
      <div className="Login">
        <div className="h-flex">
          <img src={g_logo} className="Logo" alt="logo" />
          <div className="v-flex">
            <div className="Title">Sites2C</div>
            <hr className="Break" />
            <div className="SubTitle">Googler Trip Recommendations</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
