import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, RouterProvider} from 'react-router-dom'
import Header from './components/header';
import HomePage from './pages/HomePage';
import {CoinsPage} from './pages/CoinsPage';
function App() {
  

  return (
     <BrowserRouter>
     <div>
      <Header />
      <Route path='/' Component={HomePage}></Route>
      <Route path='/Coins/:id' Component={CoinsPage}></Route>
     </div>
     </BrowserRouter>
        
  )
}

export default App
