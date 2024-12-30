import React, { useEffect, useState } from 'react';
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  Paper,
  TablePagination,
} from '@material-ui/core';
import { CoinList } from '../Config/Api'; // Assuming the API is configured
import { CryptoState } from '../CryptoContext'; // Assuming context is correctly configured
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await CoinList(currency);
      setCoins(data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredCoins = handleSearch();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          style={{ margin: '20px 0', fontFamily: 'Montserrat', color: 'white' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For A Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: 700,
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? 'left' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)} // Navigate to CoinsPages
                        key={row.id}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell component="th" scope="row">
                          <img src={row.image} alt={row.name} height="50" />
                          <div>
                            <span style={{ textTransform: 'uppercase' }}>
                              {row.symbol}
                            </span>
                            <span> {row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {row.current_price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {row.market_cap.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredCoins.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value))}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
