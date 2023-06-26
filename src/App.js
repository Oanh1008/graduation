import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Skeleton, Spin } from 'antd';

const Dashboard = lazy(() => import('./routes/common/Dashboard'))
const Staff = lazy(() => import('./routes/admin/Staff/index'))
const Services = lazy(() => import('./routes/admin/services/index'))
const Booking = lazy(() => import('./routes/admin/booking/index'))
const Myprofile = lazy(() => import('./routes/admin/profile/index'))
const Login = lazy(() => import('./routes/auth/login/index'))
const Register = lazy(() => import('./routes/auth/register/index'))
const ResetPassword = lazy(() => import('./routes/auth/reset-password/index'))
const Medicine = lazy(() => import('./routes/admin/medicine/index'))
const ManagerHospital = lazy(() => import('./routes/superadmin/hospital'))
const Hospitaldelails = lazy(() => import('./routes/superadmin/hospital/hospitaldelails'))
const ManagerUser = lazy(() => import('./routes/superadmin/users'))
const ManagerBooking = lazy(() => import('./routes/Administrative/booking'))
const History = lazy(() => import('./routes/Pratitioner/history'))
const DoctorProfile = lazy(() => import('./routes/Pratitioner/profile/index'))
const BookingDetails = lazy(() => import('./routes/Pratitioner/booking/bookingDetails/index'))
const DoctorBooking = lazy(() => import( './routes/Pratitioner/booking/index'))
const BookingDetailsConfirm = lazy(() => import('./routes/common/BookingDetails'))
const HospitalHistoryBooking = lazy(() => import('./routes/Administrative/history/index'))
const EmployeeDetails = lazy(() => import('./routes/admin/Staff/EmployeeDetail'))
const HospitalBookingHistory = lazy(() => import('./routes/admin/booking/history'))

function App() {

  return (
   <>
    <BrowserRouter>
    <Suspense fallback={ <div className='w-full h-screen flex'>
            <Spin tip="Loading..." size="large" className='w-full m-auto' />
          </div>
        }>
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
    </Suspense>
    </BrowserRouter>
   </>
  );
}

export default App;
