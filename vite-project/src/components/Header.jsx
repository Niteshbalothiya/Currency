import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@material-ui/core";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  const availableCurrencies = [
    "INR", "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "SGD"
  ];

  // Ensure selected currency is valid
  const selectedCurrency = availableCurrencies.includes(currency) ? currency : "USD";

  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Updated to 'mode' instead of 'type'
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className="text-lime-300 font-bold font-mono flex cursor-pointer">
              CryptoScope
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 120, height: 40, marginLeft: 15 }}
              value={selectedCurrency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {availableCurrencies.map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
