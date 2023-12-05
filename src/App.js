import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { useSelector } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import Login from './components/pages/Login';
import NewCar from './components/pages/NewCar';
import Rentals from './components/pages/Rentals';
import CarDetail from './components/pages/CarDetail';
import CarDelete from './components/pages/CarDelete';
import RentalNew from './components/pages/RentalNew';
import SignUp from './components/pages/SignUp';
import HomePage from './components/pages/HomePage';

import ProtectedRoute from './components/ProtectedRoute';

/* eslint-disable */
const App = () => {
  const active = useSelector((state) => state.credentials.active);

  return (
    <BrowserRouter>
      <header>
        <NotificationContainer />
      </header>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!active} redirectTo="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isAuthenticated={!active} redirectTo="/">
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={active} redirectTo="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newcar"
          element={
            <ProtectedRoute isAuthenticated={active} redirectTo="/login">
              <NewCar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deletecar"
          element={
            <ProtectedRoute isAuthenticated={active} redirectTo="/login">
              <CarDelete />
            </ProtectedRoute>
          }
        />
        <Route
          path="/car/:id"
          element={
            <ProtectedRoute isAuthenticated={active} redirectTo="/login">
              <CarDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals"
          element={
            <ProtectedRoute isAuthenticated={active} redirectTo="/login">
              <Rentals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/new"
          element={
            <ProtectedRoute isAuthenticated={active} redirectTo="/login">
              <RentalNew />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
