import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import "./Main.css";
import { ContextData } from "./utilities/ContextData";
import Loader from "./utilities/Loader";

function App() {

  const { loading } = useContext(ContextData);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;
