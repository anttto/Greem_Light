import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShop } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { BsFillPencilFill } from "react-icons/bs";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";

export default function Gnb() {
  const { user, handleLogin, handleLogout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray-300 items-center py-2 px-2">
      <Link to="/" className="flex items-center justify-start text-4xl text-brand">
        <AiOutlineShop />
        <h1>DseShop</h1>
      </Link>
      <nav className="flex justify-start items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/cart">
            <SlBasket />
          </Link>
        )}
        {user && user.isAdmin === true && (
          <Link to="/products/new">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={handleLogin}></Button>}
        {user && <Button text={"Logout"} onClick={handleLogout}></Button>}
      </nav>
    </header>
  );
}
