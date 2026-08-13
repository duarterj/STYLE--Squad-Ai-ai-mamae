import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MegaSale from "../pages/megaSale";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/megaSale" element={<MegaSale/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
