import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";

const App = () => {
  const onSuccess = (credentialResponse: CredentialResponse) => {
    const user: JwtPayload & { email: string } = jwtDecode(
      credentialResponse.credential ?? ""
    );
    const email = user.email;
    const org = email.split("@")[1];
    if (["lz95.org", "lz95.net"].indexOf(org) !== -1) {
      // Go to next page
    }
  };

  const onError = () => {
    console.log("Error.");
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError}></GoogleLogin>;
};

export default App;
