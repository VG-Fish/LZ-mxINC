import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface CreateUserApiResponse {
  success: boolean;
  message: string;
}

function UserInput() {
  const [inputValue, setInputValue] = useState("");

  const createUser = () => {
    console.log(inputValue);
    const id = parseInt(inputValue, 10);
    if (isNaN(id)) {
      alert("Enter a valid number.");
    }

    const data = { id: id, period: 1 };
    const jsonData = JSON.stringify(data);
    axios
      .post<CreateUserApiResponse>(
        "https://lz-mxinc.onrender.com/createUser",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: AxiosResponse<CreateUserApiResponse>) => {
        console.log(response.data.success);
        console.log(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setInputValue("");
  };

  return (
    <>
      <div className="text-white text-center mt-2 mb-2">
        <input
          className="rounded-1 border mt-2"
          type="text"
          placeholder="Enter your assigned number here"
          style={{ width: "100%", height: "35px" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary mt-3"
          style={{
            width: "100px",
            height: "50px",
          }}
          onClick={createUser}
        >
          Sign In
        </button>
      </div>
    </>
  );
}

export default UserInput;
