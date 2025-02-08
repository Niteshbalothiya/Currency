import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    setSymbol("$"); // Default to USD symbol
  }, []);

  return (
    <Crypto.Provider value={{ symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
