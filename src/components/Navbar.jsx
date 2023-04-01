import React from "react";
import { Link } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";

export default function Gnb() {
  const { user, handleLogin, handleLogout } = useAuthContext();

  return (
    <header className="border-b border-gray-300 items-center py-2 px-2 bg-white">
      <div className="w-full max-w-screen-xl flex justify-between items-center mx-auto">
        <Link to="/" className="flex items-center justify-start text-3xl text-brand">
          <h1>Greem Light</h1>
        </Link>
        <nav className="flex justify-start items-center gap-6 text-gray-600">
          <Link to="/">모두의그림</Link>
          <Link to="/artwork">내그림</Link>
          {user && <Link to="/liked">좋아요</Link>}
          {user && <Link to="/products/new">포스팅</Link>}
          {user && <User user={user} />}
          {!user && <Button text={"Sign In"} onClick={handleLogin}></Button>}
          {user && <Button text={"Sign Out"} onClick={handleLogout}></Button>}
        </nav>
      </div>
    </header>
  );
}
