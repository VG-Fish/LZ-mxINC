import { useEffect } from "react";

interface FundsProps {
  balance: number;
  setBalance: () => void;
}
import { useEffect } from "react";

interface FundsProps {
  balance: number;
  setBalance: () => void;
}

const Funds = ({ balance, setBalance }: FundsProps) => {
  useEffect(() => {
    setBalance();
  }, [setBalance]);
  return (
    <div
      className="text-end"
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      Funds: {balance}
    </div>
  );
};

export default Funds;
