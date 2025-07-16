import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import "remixicon/fonts/remixicon.css";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile"
import CreateJob from './pages/CreateJob';
import UpdateJob from "./pages/UpdateJob";
import ExploreJobs from "./pages/ExploreJobs";
import JobStats from "./pages/JobStats";
// import Footer from "./pages/Footer";
import About from "./pages/About";


function app() {
  return (
    <>
      <ToastContainer />
      <Routes>

        <Route path="/" element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>

        } />
        <Route path="/Login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>

        } />
        <Route path="/Register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>

        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>

        } />
        <Route path="/jobs" element={
          <PrivateRoute>
            <Jobs />
          </PrivateRoute>
        } />
        <Route path="/user/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>

        } />
        <Route path="/create-job" element={
          <PrivateRoute>
            <CreateJob />
          </PrivateRoute>
        } />
        <Route path="/update-job/:id" element={
          <PrivateRoute><UpdateJob /></PrivateRoute>

        } />
        <Route path='/job-state' element={
          <PrivateRoute><JobStats /></PrivateRoute>
        } />


        <Route path="/explore-jobs" element={
          <PublicRoute><ExploreJobs /></PublicRoute>

        } />
        <Route path="/about" element={<About />} />



        <Route path="*" element={<NotFound />} />

      </Routes>
      {/* <Footer></Footer> */}
    </>
  )
}
export default app;
