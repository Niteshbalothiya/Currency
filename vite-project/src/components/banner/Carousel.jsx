import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../Config/Api';
import { makeStyles } from '@material-ui/core';
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  Carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    textDecoration: "none",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          width="100"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol.toUpperCase()}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.Carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};
