import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../Config/Api';
import { makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';

const CoinsPages = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const classes = useStyles();

  if (!coin) return <div>Loading...</div>;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3">{coin?.name}</Typography>
        <Typography variant="subtitle1">
          {coin?.description?.en.split('.')[0]}
        </Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinsPages;
