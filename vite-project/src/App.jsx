import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import {CoinsPage }from "./pages/CoinsPage";
import { colors, makeStyles } from '@material-ui/core';

function App() {


  return (
    <Router>
      <div className='text-white min-h-screen'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Coins/:id" element={<CoinsPage />} />
        </Routes>
      </div>
    </Router>
  );
}




export default App
