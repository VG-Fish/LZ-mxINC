import React from "react";
import UserInput from "./UserInput";

const Home = () => {
  return (
    <div
      className=" mt-1 mb-5 border rounded d-flex justify-content-center align-items-center container"
      style={{
        width: "600px",
        height: "400px",
        backgroundImage: "linear-gradient(to bottom, #a2d2ff, #003049)",
        top: "50%",
        left: "50%",
        position: "fixed",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="text-center ">
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
