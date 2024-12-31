import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../Config/Api';
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  makeStyles,
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

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
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
      height: '400px', // Set a fixed height for the chart
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
        {!historicData ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <div className={classes.chartWrapper}>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    const date = new Date(coin[0]);
                    const time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price (Past ${days} Days) in ${currency}`,
                      borderColor: '#EEBC1D',
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className={classes.buttonWrapper}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
