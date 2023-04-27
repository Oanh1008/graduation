import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Home from './routes/admin/home/index';
import Staff from './routes/admin/Staff/index'
import Services from './routes/admin/services/index'
import Specialist from './routes/admin/specialist/index'
import Booking from './routes/admin/booking/index'
import Myprofile from './routes/admin/profile/index'
import Login from './routes/auth/login/index'
import Register from './routes/auth/register/index'
import ResetPassword from './routes/auth/reset-password/index'
import Invoice from './routes/admin/invoice/index'
import DoanhThu from './routes/admin/dashboard/doanhthu';
import ManagerHospital from './routes/superadmin/hospital';
import Hospitaldelails from './routes/superadmin/hospital/hospitaldelails';
import ManagerUser from './routes/superadmin/users';
import ManagerBooking from './routes/Pratitioner/booking';
import History from './routes/Pratitioner/booking/history';
import UserBooking from './routes/Pratitioner/userBooking';

function App() {

  return (
   <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/staff' element={<Staff/>}></Route>
          <Route path='/services' element={<Services/>}></Route>
          <Route path='/specialist' element={<Specialist/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          <Route path='/invoice' element={<Invoice/>}></Route>
          <Route path='/myprofile' element={<Myprofile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
          <Route path='/dashboard' element={<DoanhThu/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
          <Route path='/admin-hospital' element={<ManagerHospital/>}></Route>
          <Route path='/admin-user' element={<ManagerUser/>}></Route>
          <Route path='/admin-hospital/hospitalDetail' element={<Hospitaldelails/>}></Route>
          <Route path='/doctor/booking' element={<ManagerBooking/>}></Route>
          <Route path='/doctor/history' element={<History/>}></Route>
          <Route path='/doctor/history_user' element={<UserBooking/>}></Route>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
