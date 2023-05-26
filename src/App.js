import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Staff from './routes/admin/Staff/index'
import Services from './routes/admin/services/index'
import Booking from './routes/admin/booking/index'
import Myprofile from './routes/admin/profile/index'
import Login from './routes/auth/login/index'
import Register from './routes/auth/register/index'
import ResetPassword from './routes/auth/reset-password/index'
import Medicine from './routes/admin/medicine/index'
import ManagerHospital from './routes/superadmin/hospital';
import Hospitaldelails from './routes/superadmin/hospital/hospitaldelails';
import ManagerUser from './routes/superadmin/users';
import ManagerBooking from './routes/Administrative/booking';
import History from './routes/Pratitioner/history';
import DoctorProfile from './routes/Pratitioner/profile/index';
import BookingDetails from './routes/Pratitioner/booking/bookingDetails/index';
import DoctorBooking from './routes/Pratitioner/booking/index';
import BookingDetailsConfirm from './routes/common/BookingDetails';
import HospitalHistoryBooking from './routes/Administrative/history/index'
import Dashboard from './routes/common/Dashboard'
import EmployeeDetails from './routes/admin/Staff/EmployeeDetail'
import HospitalBookingHistory from './/routes/admin/booking/history'

function App() {

  return (
   <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/staff' element={<Staff/>}></Route>
          <Route path='/services' element={<Services/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          <Route path='/medicine' element={<Medicine/>}></Route>
          <Route path='/myprofile' element={<Myprofile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
          <Route path='/resetpassword' element={<ResetPassword/>}></Route>
          <Route path='/admin-hospital' element={<ManagerHospital/>}></Route>
          <Route path='/admin-user' element={<ManagerUser/>}></Route>
          <Route path='/admin-hospital/hospitalDetail/:id' element={<Hospitaldelails />}></Route>
          <Route path='/admin-hospital/history/' element={<HospitalBookingHistory />}></Route>
          <Route path='/doctor/booking' element={<DoctorBooking/>}></Route>
          <Route path='/doctor/history' element={<History/>}></Route>
          <Route path='/doctor/profile' element={<DoctorProfile/>}></Route>
          <Route path='/doctor/information/:id' element={<DoctorProfile/>}></Route>
          <Route path='/doctor/booking/booingDetails/:id' element={<BookingDetails/>}></Route>
          <Route path='/nurse/booking' element={<ManagerBooking/>}></Route>
          <Route path='/nurse/booking/history' element={<HospitalHistoryBooking/>}></Route>
          <Route path='/employee/information/:id' element={<EmployeeDetails/>}></Route>
          <Route path='/booking/bookingDetails/:id' element={<BookingDetailsConfirm/>}></Route>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
