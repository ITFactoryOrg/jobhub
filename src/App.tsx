import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Error, Landing, Register, ProtectedRoute } from './pages';
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
