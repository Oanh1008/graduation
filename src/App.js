import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Home from './routes/admin/home/index';
import Users from './routes/admin/users/index'
import Services from './routes/admin/services/index'
import Specialist from './routes/admin/specialist/index'
import Booking from './routes/admin/booking/index'
import Myprofile from './routes/admin/profile/index'
import Login from './routes/auth/login/index'
import Register from './routes/auth/register/index'
import ResetPassword from './routes/auth/reset-password/index'
import Invoice from './routes/admin/invoice/index'
import { useEffect } from 'react';
import DoanhThu from './routes/admin/dashboard/doanhthu';

function App() {

  return (
   <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/user' element={<Users/>}></Route>
          <Route path='/servies' element={<Services/>}></Route>
          <Route path='/specialist' element={<Specialist/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          <Route path='/invoice' element={<Invoice/>}></Route>
          <Route path='/myprofile' element={<Myprofile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
          <Route path='/doanhthu' element={<DoanhThu/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
