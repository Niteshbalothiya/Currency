import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../Config/Api';
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../Config/Data';
import SelectButton from './banner/SelectButton';

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };
console.log('data',historicData);

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark', // Updated from deprecated `type` to `mode`
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    chartWrapper: {
      width: '100%',
      height: '400px', // Fixed height for the chart
    },
    buttonWrapper: {
      display: 'flex',
      marginTop: 20,
      justifyContent: 'space-around',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
       

        
        
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
