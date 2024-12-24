import React, { createContext, useContext, useEffect, useState } from 'react'
const crypto = createContext()

const CryptoContext = ({childern}) => {
  const [currency,setCurrency] = useState("INR");
  const [symbol , setSymbol] = useState("₹");

  useEffect(() =>{
    return() => {
      if (currency === "INR") setSymbol("₹");
      else if (currency === "USD") setSymbol ("$")
      else if (currency === "	GBP") setSymbol("£")
    }
  },[currency])
  return (
    <Crypto.Provider value ={{currency,symbol,setCurrency}}>
      {childern}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
  return  useContext (Crypto);
};
