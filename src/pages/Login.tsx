import "../styles/Login.css";
import g_logo from "../assets/g_logo.png";
import userLogin from "../utilities/utilities";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  /**
   * Logs the user in through Authentication
   * @date 6/8/2023 - 10:42:00 PM
   */
  function handleLogin() {
    userLogin(navigate);
  }
  return (
    <div className="Login">
      <div className="h-flex">
        <img src={g_logo} className="Logo" alt="logo" />
        <div className="v-flex">
          <div className="Title">Sites2C</div>
          <hr className="Break" />
          <div className="SubTitle">Googler Trip Recommendations</div>
        </div>
      </div>
      <button className="signInButton" onClick={handleLogin}>
        Sign-in with Google
      </button>
    </div>
  );
}
