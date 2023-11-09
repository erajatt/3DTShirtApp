import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"
// import { Canvas } from "@react-three/fiber";
import CanvasModel from "./canvas";
import Customizer from "./pages/Customizer";

// const HomeContent = lazy(() => import("./pages/HomeContent"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
};

function AppContent() {
  const user = window.localStorage.userID;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<HomeContent />} />
    </Routes>
  );
}

export default App;
