import { useState, useEffect } from "react";

const Funds = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getUserBalance();
  }, [getUserBalance]);

  return <div className="text-end">Funds: {balance}</div>;
};

export default Funds;
