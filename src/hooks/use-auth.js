import { useCallback, useState } from "react";

const useAuth = () => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const requestAuth = useCallback(async (userInfo) => {
    setIsLoading(true);
    const url = userInfo.changePassword
      ? "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEd7g2Ium7dFMYKYIqUD6XDCblMd7aCbk"
      : userInfo.isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEd7g2Ium7dFMYKYIqUD6XDCblMd7aCbk"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEd7g2Ium7dFMYKYIqUD6XDCblMd7aCbk";
    try {
      const parameter = userInfo.changePassword
        ? {
            idToken: userInfo.token
          }
        : { email: userInfo.email };
      const body = {
        ...parameter,
        password: userInfo.password,
        returnSecureToken: true
      };
      console.log("request parameters:", body);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Authentication failed: ${data.error.message}`);
      }
      console.log(data);
      if (data) {
        setData(data);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return { isloading, data, error, setError, requestAuth };
};
export default useAuth;
