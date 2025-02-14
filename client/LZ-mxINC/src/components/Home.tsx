import { useEffect } from "react";
import UserInput from "./UserInput";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("loginId")) {
      navigate("/store");
    }
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "radial-gradient(circle at center, #a2d2ff, #003049)",
      }}
    >
      <div className="text-center">
        <h1>
          Welcome to <b>LZ-mxINC</b>
        </h1>
        <br></br>
        <div className="fs-3">Please sign in below:</div>
        <UserInput></UserInput>
      </div>
    </div>
  );
};

export default Home;
