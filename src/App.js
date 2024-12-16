import { Routes, Route } from "react-router-dom";
import { Header } from "./header/components/header";
import { Main } from "./main/Main";
import "./App.css";
import { Auth } from "./components/auth/auth";
import { Registration } from "./components/registration/registr";
import { Cart } from "./components/cart/cart";
import { Product } from "./components/product/product";
import { AdminPanel } from "./components/adminPanel/adminPanel";

export const App = () => {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<Product/>} />
      </Routes>
    </>
  );
};
