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
            <h1>Sites2C</h1>
            <hr className="Break" />
            <h2>Googler Trip Recommendations</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
