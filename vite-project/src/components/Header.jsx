import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@material-ui/core';
import { CryptoState } from '../CryptoCon'; // Adjust the path to CryptoCon

const Header = () => {
  const { currency, setCurrency } = CryptoState(); // Access context values

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
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
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;


