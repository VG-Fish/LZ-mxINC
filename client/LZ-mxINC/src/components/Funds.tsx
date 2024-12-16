import { useEffect } from "react";

interface FundsProps {
  balance: number;
  setBalance: () => void;
}

const Funds = ({ balance, setBalance }: FundsProps) => {
  useEffect(() => {
    setBalance();
  }, [setBalance]);
  return <div className="text-end">Funds: {balance}</div>;
};

export default Funds;
