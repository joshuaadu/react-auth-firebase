import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);

  const {
    isloading,
    data,
    error,
    setError: clearError,
    requestAuth
  } = useAuth();

  const clearForm = useCallback(() => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    clearError(null);
  }, [emailInputRef, passwordInputRef, clearError]);

  useEffect(() => {
    console.log(data?.idToken);
    if (data) {
      AuthCtx.login(data.idToken, data.expiresIn);
      navigate("/", { replace: true });
    }
    // if (!error && !isloading) {
    //   clearForm();
    // }
    return () => {};
  }, [AuthCtx, data, navigate]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    clearForm();
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const userInfo = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      isLogin: isLogin
    };
    console.log(userInfo);
    requestAuth(userInfo);
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {error && <div className={classes.error}>{error}</div>}
        <div className={classes.actions}>
          {isloading ? (
            <p>Loading...</p>
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
