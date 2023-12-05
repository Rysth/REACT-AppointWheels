import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Login from './components/pages/Login';
import NewCar from './components/pages/NewCar';
import Rentals from './components/pages/Rentals';
import CarDetail from './components/pages/CarDetail';
import CarDelete from './components/pages/CarDelete';
import RentalNew from './components/pages/RentalNew';
import SignUp from './components/pages/SignUp';
import HomePage from './components/pages/HomePage';

const App = () => (
  <BrowserRouter>
    <header>
      <NotificationContainer />
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/new" element={<NewCar />} />
      <Route path="/delete" element={<CarDelete />} />
      <Route path="/detail" element={<CarDetail />} />
      <Route path="/rentals" element={<Rentals />}>
        <Route path="/rentals/new" element={<RentalNew />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
