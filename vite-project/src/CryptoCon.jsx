import React, { Children, createContext, useEffect, useState } from 'react'
import { useContext } from 'react';

const Crypto = createContext()
const CryptoCon = ({Children}) => {
const [currency, setCurrency] = useState("INR")
const [ symbol, setSymbol] = useState ("₹")
     useEffect(() => {
      if (currency === "INR") setSymbol ("₹");
      else if (currency ==="USD")setSymbol (" $");
     },[currency]);

  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
      {Children}
    </Crypto.Provider>
  )
}

export default CryptoCon;
export const CryptoState =() =>{
 return useContext (Crypto);
};
