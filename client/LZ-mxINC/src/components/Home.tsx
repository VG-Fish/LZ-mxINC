import React from "react";
import UserInput from "./UserInput";

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100vh",
        height: "100vh",
        backgroundImage: "linear-gradient(to bottom, #a2d2ff, #003049)",
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
