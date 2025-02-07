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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

  const rawData = historicData?.map((data, index) => ({
    time: new Date(data[0]).toLocaleTimeString(), // Converts timestamp to readable format
    value: data[1] // Extracts price
  }));  

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days, coin]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
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
       

        
      <ResponsiveContainer width="100%" height={400}>
      <LineChart data={rawData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
        
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
