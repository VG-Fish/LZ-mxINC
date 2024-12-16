import CardsDemo2 from "./CardsDemo2";
import Funds from "./Funds";
import axios, { AxiosResponse } from "axios";

interface GetUserBalanceApiResponse {
  success: boolean;
  message: string;
  $numberDecimal: number;
}

const Store = () => {
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

  return (
    <>
      <Funds></Funds>
      <CardsDemo2></CardsDemo2>
    </>
  );
};

export default Store;
