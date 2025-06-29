import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import RegistrationForm from './containers/RegistrationForm';
import Appointment from './containers/Appointment';
import Login from './containers/Login';
import PatientDashboard from './containers/PatientDashboard';
import DoctorDashboard from './containers/DoctorDashboard';
import DoctorScheduleAppointment from './containers/DoctorScheduleAppointment';
import DoctorListScheduleAppointment from './containers/DoctorListScheduleAppointment';
import DoctorEditScheduleAppointment from './containers/DoctorEditScheduleAppointment';

import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor-schedule-appointment" element={<DoctorScheduleAppointment />} />
      <Route path="/doctor-schedule-appointment-edit/:scheduleId" element={<DoctorEditScheduleAppointment />} />
      <Route path="/doctor-schedule-list" element={<DoctorListScheduleAppointment />} />
    </Routes>
    </div>
    </>
  )
}

export default App
