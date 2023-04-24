import React from "react";
import { NavLink } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";

import { getUser, logout } from "../api/firebase";
import { useEffect } from "react";
import { useState } from "react";
export default function Gnb() {
  const { user, uid } = useAuthContext();
  const [navOpen, setNavOpen] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUser(uid).then((result) => {
      setUserData(result);
    });
  }, [uid]);

  const handleLocalNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="fixed w-full border-b border-gray-300 items-center py-2 px-4 bg-white z-50">
      <div className={`w-full max-w-screen-xl flex justify-between items-center mx-auto ${navOpen ? "open" : ""}`}>
        <NavLink to="/" className="flex items-center justify-start text-3xl text-brand">
          <h1 className="text-2xl font-medium">Greem Light</h1>
        </NavLink>
        <nav id="lnb" className="flex justify-start items-center gap-4 text-gray-600">
          <NavLink to="/" onClick={handleLocalNav}>
            모두의그림
          </NavLink>
          {/* {user && <NavLink to="/artworks">내그림</NavLink>} */}
          {user && (
            <NavLink to="/liked" onClick={handleLocalNav}>
              좋아요🍐
            </NavLink>
          )}
          {user && (
            <NavLink to="/upload" onClick={handleLocalNav}>
              그림올리기
            </NavLink>
          )}
          {user && <User userData={userData} onClick={handleLocalNav} />}
          {/* {!user && <Button text={"그림 올리기"} onClick={handleLogin}></Button>} */}
          {/* {user && <Button text={"로그아웃"} onClick={handleLogout}></Button>} */}
          {!user && (
            <NavLink to="/Join" onClick={handleLocalNav}>
              <Button text={"로그인"}></Button>
            </NavLink>
          )}
          {user && (
            <NavLink to="/" onClick={handleLocalNav}>
              <Button text={"로그아웃"} onClick={logout}></Button>
            </NavLink>
          )}
        </nav>
        <span className="lnb-btn" onClick={handleLocalNav}></span>
      </div>
    </header>
  );
}
