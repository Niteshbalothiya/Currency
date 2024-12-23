import { AppBar, Container, createTheme, Menu, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      type :'dark',
    },
});
  return (
   < ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography className='text-lime-300 font-bold font-mono flex cursor-pointer'>
          CryptoScope
          </Typography>
          <Select variant='outlined' style={{width:100,height:40,marginLeft:15,}}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    
  )
}

export default Header
