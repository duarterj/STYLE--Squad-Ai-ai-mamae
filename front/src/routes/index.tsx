import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MegaSale from "../pages/megaSale";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Termos from "../pages/Termos";
import Privacidade from "../pages/Privacidade";
import Wishlist from "../pages/Wishlist";
import Carrinho from "../pages/Carrinho";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/megaSale" element={<MegaSale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
