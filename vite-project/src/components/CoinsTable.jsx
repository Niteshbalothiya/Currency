import axios from "axios";
import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import { CoinList } from "../Config/Api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
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

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  const filteredCoins = handleSearch();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center", maxWidth: "85%", margin: "0 auto" }}>
        <Typography variant="h4" style={{ margin: "20px 0", fontFamily: "Montserrat", color: "white" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For A Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper} style={{ maxWidth: "100%", overflowX: "auto" }}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat", padding: "8px" }}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCoins.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      key={row.id}
                      style={{ backgroundColor: "#16171a", cursor: "pointer", fontFamily: "Montserrat" }}
                      onClick={() => navigate(`/coins/${row.id}`)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px" }}
                      >
                        <img
                          src={row.image}
                          alt={row.name}
                          height="30"
                          width="30"
                          style={{ borderRadius: "50%" }}
                        />
                        <div>
                          <span style={{ textTransform: "uppercase", fontSize: 16 }}>{row.symbol}</span>
                          <br />
                          <span style={{ color: "darkgrey", fontSize: 12 }}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell align="right" style={{ padding: "8px" }}>
                        {symbol} {row.current_price.toLocaleString()}
                      </TableCell>

                      <TableCell
                        align="right"
                        style={{ color: profit ? "rgb(14, 203, 129)" : "red", fontWeight: 500, padding: "8px" }}
                      >
                        {profit ? "+" : ""} {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell align="right" style={{ padding: "8px" }}>
                        {symbol} {row.market_cap.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <TablePagination
          style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }}
          count={filteredCoins.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
