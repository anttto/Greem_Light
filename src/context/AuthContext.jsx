// import { User } from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      // console.log(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: user && user.uid }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
