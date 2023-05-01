import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/header/Header'
import Home from './routes/Home';
import Footer from './component/footer';
import ListHospital from './routes/Hospital';
import Doctors from './routes/Doctors';
import DoctorDetails from './routes/Doctors/doctorDetails';
function App() {
  return (
        <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>}></Route>
          <Route path='/hospital' element= {<ListHospital/>}></Route>
          <Route path='/doctor' element= {<Doctors/>}></Route>
          <Route path='/doctor/doctorDetails/:id' element= {<DoctorDetails/>}></Route>
        </Routes>
        </BrowserRouter>
  );
}

export default App;
