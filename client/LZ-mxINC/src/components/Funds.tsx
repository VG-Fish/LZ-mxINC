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
      style={{
        position: "fixed",
        zIndex: 1000,
        width: "100%",
        backgroundColor: "#f5ebe0",
        alignItems: "center",
      }}
    >
      <img src="public/lz95_logo.jpg" width="30px" height="30px"></img>
      <strong> LZ-mxINC</strong>
      <div
        className="text-end"
        style={{
          position: "fixed",
          right: "10px",
          top: "0px",
          zIndex: 1000,
        }}
      >
        Funds: {balance}
      </div>
    </div>
  );
};

export default Funds;
