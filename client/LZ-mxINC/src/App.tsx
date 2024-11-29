import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const onSuccess = (credentialResponse: CredentialResponse) => {
    console.log(jwtDecode(credentialResponse.credential ?? ""));
  };

  const onError = () => {
    console.log("Error.");
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError}></GoogleLogin>;
};

export default App;
