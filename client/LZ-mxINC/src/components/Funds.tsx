import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

interface GetUserBalanceApiResponse {
  success: boolean;
  message: string;
  $numberDecimal: number;
}

const Funds = () => {
  const [balance, setBalance] = useState(0);
  const getUserBalance = () => {
    const id = localStorage.getItem("loginId");
    console.log(`https://lz-mxinc.onrender.com/getUserBalance:${id}`);
    axios
      .get(`https://lz-mxinc.onrender.com/getUserBalance:${id}`)
      .then((response: AxiosResponse<GetUserBalanceApiResponse>) => {
        setBalance(response.data.$numberDecimal);
      })
      .catch((_) => alert("Error getting user balance."));
  };

  useEffect(() => {
    getUserBalance();
  }, [getUserBalance]);

  return <div className="text-end">Funds: {balance}</div>;
};

export default Funds;
