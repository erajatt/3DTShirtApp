import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CanvasModel from "./canvas";
import Customizer from "./pages/Customizer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function HomeContent() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel />
      <Customizer />
    </main>
  );
}

function AppContent() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={window.localStorage.getItem("userID")?<HomeContent />:<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
