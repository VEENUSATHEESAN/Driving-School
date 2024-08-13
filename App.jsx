import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ScheduleManagement from './components/ScheduleManagement';
import VehicleManagement from './components/VehicleManagement';
import CourseManagement from './components/CourseManagement';
import InstructorManagement from './components/InstructorManagement';
import StudentManagement from './components/StudentManagement';
import PaymentManagement from './components/PaymentManagement';
import AdminSettings from './components/AdminSettings';
import AuthPage from './components/AuthPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Prices from './components/Prices';
import UserPaymentPortal from './components/UserPaymentPortal';
import { ScheduleProvider } from './components/ScheduleContext'; // Ensure correct path
import { InstructorProvider } from './components/InstructorContext';
import EndrollPortal from './components/EndrollPortal';
import Register from './components/Register';
import CalendarView from './components/CalendarView';
import UserSchedule from './components/UserSchedule';
import AddEditLesson from './components/AddEditLesson';
import { VehicleProvider } from './components/VehicleContext';
import { CourseProvider } from './components/CourseContext';
import { ThemeProvider } from './components/ThemeContext'; // Ensure correct path
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const handlePaymentSubmit = (paymentDetails) => {
    console.log('Payment submitted:', paymentDetails);
    // Implement payment processing logic here
  };

  return (
    <ThemeProvider>
      <ScheduleProvider>
        <InstructorProvider>
          <VehicleProvider>
            <CourseProvider>
              <Router>
                <div>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/course-management/*" element={<CourseManagement />} />
                    <Route path="/instructor-management/*" element={<InstructorManagement />} />
                    <Route path="/student-management/*" element={<StudentManagement />} />
                    <Route path="/AuthPage" element={<AuthPage />} />
                    <Route path="/schedule/*" element={<ScheduleManagement />} />
                    <Route path="/vehicle-management/*" element={<VehicleManagement />} />
                    <Route path="/payment-management/*" element={<PaymentManagement />} />
                    <Route path="/admin-settings/*" element={<AdminSettings />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
                    <Route path="/user-dashboard/*" element={<UserDashboard />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/user-payment-portal" element={<UserPaymentPortal />} />
                    <Route path="/EndrollPortal" element={<EndrollPortal onPaymentSubmit={handlePaymentSubmit} />} />
                    <Route path="/RegisterHere" element={<Register />} />
                    <Route path="/calendar-view" element={<CalendarView />} />
                    <Route path="/user-schedule" element={<UserSchedule />} />
                    <Route path="/add-edit-lesson" element={<AddEditLesson />} />
                  </Routes>
                </div>
              </Router>
              <ToastContainer />
            </CourseProvider>
          </VehicleProvider>
        </InstructorProvider>
      </ScheduleProvider>
    </ThemeProvider>
  );
};

export default App;
