import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./homescreen";
import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeScreen" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
