import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Home from './routes/admin/home/index';
import Staff from './routes/admin/staff/index'
import Services from './routes/admin/services/index'
import Specialist from './routes/admin/specialist/index'
import Booking from './routes/admin/booking/index'
import Myprofile from './routes/admin/profile/index'
import Login from './routes/auth/login/index'
import { useEffect } from 'react';

function App() {

  return (
   <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/user' element={<Staff/>}></Route>
          <Route path='/servies' element={<Services/>}></Route>
          <Route path='/specialist' element={<Specialist/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          <Route path='/myprofile' element={<Myprofile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
