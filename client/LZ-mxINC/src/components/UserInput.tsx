import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface CreateUserApiResponse {
  success: boolean;
  message: string;
  id: number;
  period: number;
}

function UserInput() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loginId")) {
      navigate("/store");
    }
  }, [navigate]);

  const createUser = () => {
    const id = parseInt(inputValue, 10);
    if (isNaN(id)) {
      alert("Enter a valid number.");
      return;
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
        localStorage.setItem("loginId", String(response.data.id));
        navigate("/store");
      })
      .catch((_) => {
        const data = { id: id, period: 2 };
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
            localStorage.setItem("loginId", String(response.data.id));
            navigate("/store");
          })
          .catch((_) => {
            alert("Error creating user, try entering a valid id.");
          });
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
