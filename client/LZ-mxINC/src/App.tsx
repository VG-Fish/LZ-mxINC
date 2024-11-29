import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigator = useNavigate();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    const user: JwtPayload & { email: string } = jwtDecode(
      credentialResponse.credential ?? ""
    );
    const email = user.email;
    const org = email.split("@")[1];
    if (["lz95.org", "lz95.net"].indexOf(org) !== -1) {
      navigator("/store");
    }
  };

  const onError = () => {
    console.log("Error.");
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError}></GoogleLogin>;
};

export default App;
