import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext([null, () => { }]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

// Dette er det jeg trenger for å få tak i accessToken, men hvordan...?
// Fortsett i JS 2 Module 3.