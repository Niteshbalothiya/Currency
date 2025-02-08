import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../Config/Api";
import { CryptoState } from "../CryptoContext";
import { makeStyles, Typography, CircularProgress, LinearProgress } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "20px",
    "@media (max-width: 960px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRight: "2px solid grey",
    "@media (max-width: 960px)": {
      width: "100%",
      borderRight: "none",
      borderBottom: "2px solid grey",
      marginBottom: 20,
    },
  },
}));

const CoinsPages = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };
    fetchCoin();
  }, [id]);

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold", width: "100%" }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={coin.image.large} alt={coin.name} height="200" />
        <Typography variant="h2">{coin.name}</Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinsPages;
