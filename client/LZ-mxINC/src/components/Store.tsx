import { useEffect, useState } from "react";
import CardsDemo2 from "./CardsDemo2";
import Funds from "./Funds";
import axios, { AxiosResponse } from "axios";
import products from "../../../../products_info.json";

interface GetUserBalanceApiResponse {
  success: boolean;
  message: string;
  $numberDecimal: number;
}

interface GetUserAmountAvailableApiResponse {
  success: boolean;
  message: string;
  inventory: [number];
}

const Store = () => {
  const [balance, setBalance] = useState(0);
  const setUserBalance = () => {
    const id = localStorage.getItem("loginId");
    axios
      .get(`https://lz-mxinc.onrender.com/getUserBalance:${id}`)
      .then((response: AxiosResponse<GetUserBalanceApiResponse>) => {
        setBalance(
          Number(parseFloat(String(response.data.$numberDecimal)).toFixed(2))
        );
      })
      .catch((_) => alert("Error getting user balance."));
  };

  const [productAmountAvailable, setProductAmountAvailable] = useState(
    Array(products.products.length) as [number]
  );

  const getAmountAvailable = () => {
    const id = localStorage.getItem("loginId");
    axios
      .get(`https://lz-mxinc.onrender.com/getUserProductsAvailable:${id}`)
      .then((response: AxiosResponse<GetUserAmountAvailableApiResponse>) => {
        setProductAmountAvailable(response.data.inventory);
      })
      .catch((_) => alert("Error getting user balance."));
    return productAmountAvailable;
  };

  useEffect(() => {
    getAmountAvailable();
  }, [getAmountAvailable]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: "linear-gradient(to bottom, #a2d2ff, #003049)",
          overflow: "auto",
        }}
      >
        <Funds balance={balance} setBalance={setUserBalance}></Funds>
        <CardsDemo2
          productAmountAvailable={productAmountAvailable as [number]}
          updateProductAmountAvailable={getAmountAvailable}
          updateBalance={setUserBalance}
        ></CardsDemo2>
      </div>
    </>
  );
};

export default Store;
