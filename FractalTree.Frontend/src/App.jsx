import { useNavigate } from "react-router";
import BottomBar from "./Components/BottomBar";

export default function App() {
    var navigate = useNavigate();
    setTimeout(() => navigate("/sandbox"), 0);
}