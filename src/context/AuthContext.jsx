import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);


  /*global Kakao*/
  const redirectUri = "http://localhost:3000/";
  const onClickToAuthorize = () => {
    Kakao.Auth.authorize({
      redirectUri: redirectUri,
    });
  };

  useEffect(() => {
    const authorizeCodeFromKakao = window.location.search.split("=")[1];
    if (authorizeCodeFromKakao !== "undefine") {
      // console.log(`authorizeCodeFromKakao : ${authorizeCodeFromKakao}`);

      const body = {
        grant_type: "authorization_code",
        client_id: '82b2cfe2070dc6367ccd415496e4109d',
        redirect_uri: 'http://localhost:3000/',
        code: authorizeCodeFromKakao
      }
      
      const queryStringBody = Object.keys(body)
        .map(k => encodeURIComponent(k) + "=" + encodeURI(body[k]))
        .join("&");
      
      const getToken = async () => {
        const res = await fetch("https://kauth.kakao.com/oauth/token",{
          method: "POST",
          headers: {
            'content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
          },
          body : queryStringBody
        });
        if (!res) {
          return 
        } else {
          const data = await res.json();
          return data.access_token;
        }
      }
      
      const getProfile = async (accessToken) => {
        const res = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await res.json();
        return data;
      }
      
      const fetchData = async () => {
        const accessToken = await getToken();
        const profileData = await getProfile(accessToken);
        console.log(profileData);
        // 여기서 회원 정보를 처리
      }
      
      fetchData();
    }
  }, []);




  const handleLogin = () => {
    login().then((user) => setUser(user));
  };

  const handleLogout = () => {
    logout().then((user) => setUser(user));
    navigate("/");
  };

  return <AuthContext.Provider value={{ user, uid: user && user.uid, handleLogin, handleLogout,onClickToAuthorize }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
