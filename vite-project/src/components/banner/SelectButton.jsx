import React from 'react';
import { makeStyles } from '@material-ui/core';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme) => ({
    selectButton: {
      border: '1px solid gold',
      borderRadius: 5,
      padding: '10px 20px',
      fontFamily: 'Montserrat',
      cursor: 'pointer',
      backgroundColor: selected ? 'gold' : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      transition: 'all 0.3s ease',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: 'gold',
        color: 'black',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%', // Full width on small screens
        marginBottom: 10, // Spacing between buttons for stacked layout
      },
      width: '22%', // Default width for larger screens
    },
  }));

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
