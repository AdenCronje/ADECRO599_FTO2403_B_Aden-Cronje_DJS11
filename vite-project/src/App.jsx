import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shows from "./components/Shows";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
