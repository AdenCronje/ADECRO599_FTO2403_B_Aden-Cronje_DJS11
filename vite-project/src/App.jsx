import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Shows from "../src/pages/Shows";
import "./App.css";
import ShowDetails from "./components/ShowsDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shows" element={<Shows />} />

        <Route path="/Shows/:previewId" element={<ShowDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
