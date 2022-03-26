import { useContext, useEffect, useRef } from "react";
import useAuth from "../../hooks/use-auth";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const AuthCtx = useContext(AuthContext);
  const { isloading, data, error, requestAuth } = useAuth();

  useEffect(() => {
    console.log("passward changed: ", data);
    console.log("passward change error: ", error);
    console.log("idToken1 ", AuthCtx.token);
  }, [data, error, AuthCtx]);

  const submitHandler = (event) => {
    event.preventDefault();
    requestAuth({
      changePassword: true,
      password: newPasswordRef.current.value,
      token: AuthCtx.token
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        {isloading ? <div>Loading...</div> : <button>Change Password</button>}
      </div>
    </form>
  );
};

export default ProfileForm;
