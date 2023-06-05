import React from "react";
import "../styles/Login.css";
import g_logo from "../assets/g_logo.png";
import { database, storage, auth } from "../firebase-config";
import userLogin from "../utilities/utilities";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./homescreen";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    userLogin(navigate);
  }
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
        <button onClick={handleLogin}>Sign-in</button>
      </div>
    </>
  );
}
