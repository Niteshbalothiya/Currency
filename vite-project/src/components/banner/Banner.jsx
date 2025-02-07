import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Carousel } from './Carousel';

const useStyles = makeStyles (() => ({
  banner:{
    backgroundImage:"url(./banner2.jpg)",
  },
  bannerContext:{
    height: 400,
    display:"flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around"
  },
tagline:{
  height:"40%",display:"flex",flexDirection:"column",textAlign:"center",justifyContent:"center",
}
}));
const Banner = () => {
  const classes =useStyles();
  
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContext }>
       <div className={classes.tagline}>
        <Typography  style={{
          fontWeight:'bold',marginBottom:15,fontFamily:"Montserrat",color:'white', fontSize :"52px",  }} >Crypto SCOPE</Typography>
          <Typography variant='subtitle1'    style={{
          fontWeight:'bold',marginBottom:15,fontFamily:"Montserrat",color:"darkgrey",  textTransform:"capitalize"}} >Get all Info regarding your favourite Crypto Currency</Typography>
       </div>
        <Carousel></Carousel>
      </Container>
      
    </div>
  )
}

export default Banner
