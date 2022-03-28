import { createContext, useCallback, useEffect, useState } from "react";

const initialValue = {
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
};

const AuthContext = createContext(initialValue);

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialExpirePeriod = localStorage.getItem("expiresIn");
  const [token, setToken] = useState(initialToken);
  const [tokenExpirePeriod, setTokenExpirePeriod] = useState(
    initialExpirePeriod
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (token, expiresIn) => {
    setToken(token);
    setTokenExpirePeriod(expiresIn);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setTokenExpirePeriod(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
  }, []);

  useEffect(() => {
    setTimeout(logoutHandler, tokenExpirePeriod * 1000);
  }, [logoutHandler, tokenExpirePeriod, token]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
