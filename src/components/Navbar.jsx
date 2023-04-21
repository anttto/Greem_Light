import React from "react";
import { NavLink } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";

import { logout } from "../api/firebase";
export default function Gnb() {
  const { user } = useAuthContext();
  return (
    <header className="sticky w-full border-b border-gray-300 items-center py-2 px-4 bg-white z-50">
      <div className="w-full max-w-screen-xl flex justify-between items-center mx-auto">
        <NavLink to="/" className="flex items-center justify-start text-3xl text-brand">
          <h1 className="text-2xl font-medium">Greem Light</h1>
        </NavLink>
        <nav className="flex justify-start items-center gap-4 text-gray-600">
          <NavLink to="/">모두의그림</NavLink>
          {/* {user && <NavLink to="/artworks">내그림</NavLink>} */}
          {user && <NavLink to="/liked">좋아요🍐</NavLink>}
          {user && <NavLink to="/upload">그림올리기</NavLink>}
          {user && (
            <NavLink to="/artworks">
              <User user={user} />
            </NavLink>
          )}
          {/* {!user && <Button text={"그림 올리기"} onClick={handleLogin}></Button>} */}
          {/* {user && <Button text={"로그아웃"} onClick={handleLogout}></Button>} */}
          {!user && (
            <NavLink to="/Join">
              <Button text={"로그인"}></Button>
            </NavLink>
          )}
          {user && (
            <NavLink to="/">
              <Button text={"로그아웃"} onClick={logout}></Button>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
