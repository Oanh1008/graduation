import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/header/Header'
import Home from './routes/Home';
import Footer from './component/footer';
function App() {
  return (
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element= {<Home/>}></Route>
        </Routes>
        <Footer/>
        </BrowserRouter>
  );
}

export default App;
