import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Store from "./components/Store";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";

const App = () => {
  const navigator = useNavigate();
  const [loginErrored, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSuccess = (credentialResponse: CredentialResponse) => {
    const user: JwtPayload & { email: string } = jwtDecode(
      credentialResponse.credential ?? ""
    );
    const email = user.email;
    const org = email.split("@")[1];
    if (["lz95.org", "lz95.net"].indexOf(org) !== -1) {
      // TODO: finish logic here.
      navigator("/store");
    } else {
      setErrorMessage("Cannot login.");
      setLoginError(true);
    }
  };

  const onError = () => {
    setErrorMessage("User not allowed to login.");
    setLoginError(true);
  };

  return (
    <>
      <Home></Home>
      {loginErrored && <div>{errorMessage}</div>}
      <div className="d-flex justify-content-center align-items-center">
        <div style={{ width: "300px" }}>
          <GoogleLogin onSuccess={onSuccess} onError={onError}></GoogleLogin>
        </div>
      </div>
      <Store></Store>
    </>
  );
};

export default App;
