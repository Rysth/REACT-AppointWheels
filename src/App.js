import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { useSelector } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import Login from './components/pages/sessions/Login';
import NewCar from './components/pages/car/NewCar';
import Rentals from './components/pages/rentals/Rentals';
import CarDetail from './components/pages/car/CarDetail';
import CarDelete from './components/pages/car/CarDelete';
import RentalNew from './components/pages/rentals/RentalNew';
import SignUp from './components/pages/sessions/SignUp';
import HomePage from './components/pages/Home/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/shared/Navigation';

const App = () => {
  const active = useSelector((state) => state.credentials.active);

  /* eslint-disable */
  return (
    <BrowserRouter>
      <header>
        <NotificationContainer />
      </header>
      <main className="flex flex-col md:flex-row">
        {active && <Navigation />}
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
            path="/rental/new"
            element={
              <ProtectedRoute isAuthenticated={active} redirectTo="/login">
                <RentalNew />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
export default App;
