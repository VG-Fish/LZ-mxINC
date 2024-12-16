import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const Funds = () => {
  const getUserBalance = () => {
    const id = localStorage.getItem("loginId");
  };
  const [balance, setBalance] = useState(getUserBalance());
  return <div className="text-end">Funds: 0</div>;
};

export default Funds;
