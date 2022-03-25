import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/use-auth";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isloading, data, error, requestAuth } = useAuth();

  useEffect(() => {
    console.log("isLoading: ", isloading);
    console.log("data: ", data);
    console.log("error: ", error);
  }, [data, isloading, error]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const userInfo = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };
    console.log(userInfo);
    requestAuth(userInfo, isLogin);
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
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
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
