import React from "react";
import { NavLink } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";

export default function Gnb() {
  const { user, handleLogin, handleLogout } = useAuthContext();
  return (
    <header className="border-b border-gray-300 items-center py-2 px-6 bg-white">
      <div className="w-full max-w-screen-xl flex justify-between items-center mx-auto">
        <NavLink to="/" className="flex items-center justify-start text-3xl text-brand">
          <h1>Greem Light</h1>
        </NavLink>
        <nav className="flex justify-start items-center gap-6 text-gray-600">
          <NavLink to="/">모두의그림</NavLink>
          {user && <NavLink to="/artworks">내그림</NavLink>}
          {user && <NavLink to="/liked">좋아요</NavLink>}
          {user && <NavLink to="/artworks/upload">포스팅</NavLink>}
          {user && <User user={user} />}
          {!user && <Button text={"그림 올리기"} onClick={handleLogin}></Button>}
          {user && <Button text={"연결 끊기"} onClick={handleLogout}></Button>}
        </nav>
      </div>
    </header>
  );
}
