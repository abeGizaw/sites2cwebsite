import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./homeScreen/homescreen";
import Login from "./Login";
import CardScreen from "./cardScreen/CardScreen";
import UserScreen from "./userCardScreen/UserScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeScreen" element={<HomeScreen />} />
        <Route path="/cardScreen/:cardID" element={<CardScreen />} />
        <Route path="/UserScreen/:userID" element={<UserScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
