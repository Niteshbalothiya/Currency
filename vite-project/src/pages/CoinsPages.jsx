import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SingleCoin } from '../Config/Api';
import { CryptoState } from '../CryptoContext';
import { makeStyles, Typography, CircularProgress, LinearProgress } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '20px',
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
    padding: '20px',
    borderRight: '2px solid grey',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRight: 'none',
      borderBottom: '2px solid grey',
      marginBottom: 20,
    },
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  description: {
    fontFamily: 'Montserrat',
    textAlign: 'justify',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  marketData: {
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column', // Ensures each item starts on a new line
    gap: '15px', // Adds spacing between items
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  marketDataItem: {
    display: 'flex',
    flexDirection: 'column', // Label and value on separate lines
    fontFamily: 'Montserrat',
  },
}));

const CoinsPages = () => {
  const { id } = useParams(); // Retrieve the coin ID from the URL
  const [coin, setCoin] = useState(null); // State to hold coin data
  const { currency, symbol } = CryptoState(); // Retrieve global currency state
  const classes = useStyles(); // Use Material-UI styles

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id)); // Fetch coin data
      setCoin(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching coin data:', error); // Log error for debugging
    }
  };


  useEffect(() => {
    fetchCoin(); // Fetch data when the component mounts or `id` changes
  }, [id]);

  const numberWithCommas = (x) => x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!coin) {
    return (
      <div className={classes.container}>
        <LinearProgress style={{ backgroundColor: 'gold', width: '100%' }} />
        <CircularProgress style={{ color: 'gold', marginTop: '20px' }} />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {coin?.description?.en?.split('.')[0] || 'No description available.'}
        </Typography>
        <div className={classes.marketData}>
          <div className={classes.marketDataItem}>
            <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            <Typography variant="body1">
              {coin?.market_cap_rank}
            </Typography>
          </div>
          <div className={classes.marketDataItem}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            <Typography variant="body1">
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </div>
          <div className={classes.marketDataItem}>
            <Typography variant="h6" className={classes.heading}>
              Market Cap:
            </Typography>
            <Typography variant="body1">
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{' '}
              M
            </Typography>
          </div>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinsPages;
